import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import prisma from "../db-client";
import { supabase } from "../supabase-client";

const api = new Hono();

api.post("/login", async ctx => {
  const { email, password } = await ctx.req.json();

  const { data, error: userAuthError } = await supabase.auth.getUser();

  console.log(data);

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    throw new HTTPException(response.error.status, {
      message: response.error.message,
    });
  }

  return ctx.json({ data: response });
});

api.post("/register", async ctx => {
  const { email, password } = await ctx.req.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new HTTPException(error.status, { message: error.message });
  }

  await prisma.user.create({
    data: {
      id: data.user.id,
      email: data.user.email,
    },
  });

  return ctx.text("Registered");
});

api.get("/logout", async ctx => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new HTTPException(error.status, { message: error.message });
  }

  return ctx.text("Logged out");
});

export const authRouter = api;
