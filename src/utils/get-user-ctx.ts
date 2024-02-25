import type { User } from '@supabase/supabase-js';
import type { Context } from 'hono';
import { InternalError } from '../error';

export const getUserCtx = (ctx: Context) => {
  if (!ctx.get('user')) throw new InternalError('User not found in context');

  return ctx.get('user') as User;
};