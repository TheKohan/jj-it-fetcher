import { Hono } from 'hono';
import { supabase } from '../supabase-client';
import prisma from '../db-client';

const api = new Hono();

api.post('/login', async ctx => {
  const { email, password } = await ctx.req.json();

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return ctx.text('Logged in');
});

api.post('/register', async ctx => {
  const { email, password } = await ctx.req.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return ctx.json(error, error.status);
  }

  await prisma.user.create({
    data: {
      id: data.user.id,
      email: data.user.email,
    },
  });

  return ctx.text('Registered');
});

api.get('/logout', async ctx => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return ctx.json(error, error.status);
  }

  return ctx.text('Logged out');
});

export const authRouter = api;
