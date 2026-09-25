import type { ToolDeclaration } from '../../types';

/** Who is asking. Built only from the verified Firebase token. */
export interface ToolContext {
  uid: string;
  idToken: string;
}

/**
 * A capability Mino can call: a declaration the model sees plus a server-side
 * handler. Handlers only touch the calling student's own data.
 */
export interface MinoTool {
  declaration: ToolDeclaration;
  run(ctx: ToolContext, args: Record<string, unknown>): Promise<unknown>;
}
