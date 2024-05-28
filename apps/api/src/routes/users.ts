import { Hono } from "hono";
import prisma from "../db-client";
import { getUserCtx } from "@fetcher-api/utils";

const api = new Hono();

//@TODO: Need to delete users from Prisma when they are deleted from Supabase Auth

api.get("/sync-user", async ctx => {

  const {id, email} = getUserCtx(ctx);
  const isUserAlreadySynced = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  
  if (!isUserAlreadySynced) {
    await prisma.user.create({
      data: {
        id,
        email,
      },
    });
  }


  return ctx.json({ data: { status: 200, message: "ok"} });
});

export const usersApi = api;
