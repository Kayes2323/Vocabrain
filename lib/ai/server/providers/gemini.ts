import type { AIProvider, AIRunRequest, AIRunResult, ToolCallRecord } from '../../types';
import { LIMITS, MODELS } from '../config';
import { MinoError } from '../errors';

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

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
  if (status === 404) return new MinoError('not_configured', 'model not found; check MINO_MODEL_* settings');
  if (status === 429) return new MinoError('provider_busy', 'rate limited by provider');
  if (status >= 500) return new MinoError('provider_busy', `provider ${status}`);
  return new MinoError('unavailable', `provider ${status}`);
}

async function call(model: string, apiKey: string, body: unknown, signal?: AbortSignal): Promise<GeminiResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LIMITS.timeoutMs);
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
      const model = MODELS[req.tier];
      const contents: GeminiContent[] = req.messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      const toolCalls: ToolCallRecord[] = [];
      const usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };
      const maxRounds = req.tools?.length ? (req.maxToolRounds ?? LIMITS.maxToolRounds) : 0;

      for (let round = 0; ; round++) {
        const data = await call(
          model,
          apiKey,
          {
            systemInstruction: { parts: [{ text: req.system }] },
            contents,
            generationConfig: { maxOutputTokens: req.maxOutputTokens ?? LIMITS.maxOutputTokens, temperature: 0.6 },
            ...(req.tools?.length && round < maxRounds ? { tools: [{ functionDeclarations: req.tools }] } : {}),
          },
          req.signal,
        );
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
