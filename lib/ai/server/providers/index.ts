import type { AIProvider } from '../../types';
import { geminiApiKey } from '../config';
import { createGeminiProvider } from './gemini';

/**
 * The active AI provider. Gemini today; add another provider by implementing
 * AIProvider and selecting it here (e.g. via MINO_AI_PROVIDER).
 */
export function getProvider(): AIProvider | null {
  const provider = process.env.MINO_AI_PROVIDER || 'gemini';
  if (provider === 'gemini') {
    const key = geminiApiKey();
    return key ? createGeminiProvider(key) : null;
  }
  return null;
}
