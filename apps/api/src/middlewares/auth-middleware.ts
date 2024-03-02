import type { MiddlewareHandler } from 'hono';
import { supabase } from '../supabase-client';

export const authMiddleware: MiddlewareHandler = async (ctx, next) => {
  const { data, error: userAuthError } = await supabase.auth.getUser();
  const { error } = await supabase.auth.refreshSession();

  if (userAuthError || error) {
    return ctx.text('Unauthorized', 401);
  }

  ctx.set('user', data.user);

  await next();
};
