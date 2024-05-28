import type { UserContext } from "@fetcher-api/utils";
import type { MiddlewareHandler } from "hono";

import jwt, { type JwtPayload } from "jsonwebtoken";

const { SUPABASE_JWT_SECRET } = process.env;

export const authMiddleware: MiddlewareHandler = async (ctx, next) => {
  const authorization = ctx.req.headers.get("authorization");

  if (!authorization) {
    return ctx.json({ error: "Unauthorized", status: 401 }, 401);
  }

  const clientJwt = authorization.split("Bearer ").pop();
  try {
    const user = jwt.verify(clientJwt, SUPABASE_JWT_SECRET) as JwtPayload;

    ctx.set("user", { id: user.sub, email: user.email } as UserContext);
  } catch (e) {
    return ctx.json({ error: "Unauthorized", status: 401 }, 401);
  }

  await next();
};
