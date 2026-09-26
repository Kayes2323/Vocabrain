import type { AIProvider, AIRunRequest, AIRunResult, ToolCallRecord } from '../../types';
import { LIMITS, MODEL_CHAINS } from '../config';
import { MinoError } from '../errors';

// Overridable for local end-to-end tests against a mock server; production uses Google.
const ENDPOINT = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL_NOT_FOUND = 'model not found';

/** The first model in each tier's chain that worked, remembered per server instance. */
const workingModel = new Map<string, string>();

interface GeminiPart {
  text?: string;
  functionCall?: { name: string; args?: Record<string, unknown> };
  functionResponse?: { name: string; response: Record<string, unknown> };
  thought?: boolean;
  thoughtSignature?: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiResponse {
  candidates?: { content?: GeminiContent; finishReason?: string }[];
  usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; totalTokenCount?: number };
  promptFeedback?: { blockReason?: string };
}

function mapHttpError(status: number, body: string): MinoError {
  // Never include the request (it carries the key) in errors.
  if (status === 400 && /API_KEY_INVALID|API key not valid/i.test(body)) return new MinoError('not_configured', 'invalid api key');
  if (status === 401 || status === 403) return new MinoError('not_configured', `auth ${status}`);
  if (status === 404) return new MinoError('not_configured', MODEL_NOT_FOUND);
  if (status === 429) return new MinoError('provider_busy', 'rate limited by provider');
  if (status >= 500) return new MinoError('provider_busy', `provider ${status}`);
  return new MinoError('unavailable', `provider ${status}`);
}

async function call(model: string, apiKey: string, body: unknown, signal: AbortSignal | undefined, timeoutMs: number): Promise<GeminiResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener('abort', () => controller.abort());
  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    throw new MinoError(controller.signal.aborted ? 'timeout' : 'unavailable', (error as Error).name);
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw mapHttpError(res.status, await res.text().catch(() => ''));
  try {
    return (await res.json()) as GeminiResponse;
  } catch {
    throw new MinoError('unavailable', 'malformed provider response');
  }
}

/** Gemini via the REST API (no SDK), with function calling. */
export function createGeminiProvider(apiKey: string): AIProvider {
  return {
    id: 'gemini',
    async run(req: AIRunRequest): Promise<AIRunResult> {
      const chain = MODEL_CHAINS[req.tier];
      let model = workingModel.get(req.tier) ?? chain[0];
      const started = Date.now();
      const timeoutMs = req.timeoutMs ?? LIMITS.timeoutMs;
      const budgetMs = req.budgetMs ?? timeoutMs * 2;
      const contents: GeminiContent[] = req.messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      const toolCalls: ToolCallRecord[] = [];
      const usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };
      const maxRounds = req.tools?.length ? (req.maxToolRounds ?? LIMITS.maxToolRounds) : 0;

      for (let round = 0; ; round++) {
        const body = {
          systemInstruction: { parts: [{ text: req.system }] },
          contents,
          generationConfig: {
            maxOutputTokens: req.maxOutputTokens ?? LIMITS.maxOutputTokens,
            temperature: req.json ? 0.2 : 0.6,
            ...(req.json ? { responseMimeType: 'application/json' } : {}),
          },
          ...(req.tools?.length && round < maxRounds ? { tools: [{ functionDeclarations: req.tools }] } : {}),
        };
        let data: GeminiResponse;
        for (;;) {
          try {
            const left = budgetMs - (Date.now() - started);
            data = await call(model, apiKey, body, req.signal, Math.max(5_000, Math.min(timeoutMs, left)));
            break;
          } catch (error) {
            // Before the conversation has started, move down the model chain when a
            // model is retired (remembered), overloaded or too slow (just this request).
            const next = chain[chain.indexOf(model) + 1];
            const retired = error instanceof MinoError && error.detail === MODEL_NOT_FOUND;
            const transient = error instanceof MinoError && (error.code === 'provider_busy' || error.code === 'timeout');
            const timeLeft = budgetMs - (Date.now() - started) > 8_000;
            if (round === 0 && next && (retired || (transient && timeLeft))) {
              console.warn('[mino] model failed, trying next', JSON.stringify({ model, next, reason: error instanceof MinoError ? error.code : 'error' }));
              if (retired) workingModel.set(req.tier, next);
              model = next;
              continue;
            }
            throw error;
          }
        }
        usage.inputTokens += data.usageMetadata?.promptTokenCount ?? 0;
        usage.outputTokens += data.usageMetadata?.candidatesTokenCount ?? 0;
        usage.totalTokens += data.usageMetadata?.totalTokenCount ?? 0;

        if (data.promptFeedback?.blockReason) throw new MinoError('unavailable', `blocked: ${data.promptFeedback.blockReason}`);
        const candidate = data.candidates?.[0];
        const parts = candidate?.content?.parts ?? [];
        const calls = parts.filter((p) => p.functionCall);

        if (calls.length > 0 && req.runTool && round < maxRounds) {
          // Echo the model turn exactly (it may carry thought signatures), then answer each call.
          contents.push({ role: 'model', parts });
          const responses: GeminiPart[] = [];
          for (const p of calls) {
            const { name, args = {} } = p.functionCall!;
            let result: unknown;
            try {
              result = await req.runTool(name, args);
              toolCalls.push({ name, ok: true });
            } catch (error) {
              result = { error: (error as Error).message || 'tool failed' };
              toolCalls.push({ name, ok: false });
            }
            responses.push({ functionResponse: { name, response: { result } } });
          }
          contents.push({ role: 'user', parts: responses });
          continue;
        }

        const text = parts
          .filter((p) => p.text && !p.thought)
          .map((p) => p.text)
          .join('')
          .trim();
        if (!text) throw new MinoError('unavailable', `empty response (${candidate?.finishReason ?? 'no candidate'})`);
        return { text, model, usage, toolCalls, truncated: candidate?.finishReason === 'MAX_TOKENS' };
      }
    },
  };
}
