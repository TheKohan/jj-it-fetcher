import { Hono } from "hono";
import { userController } from "@fetcher-api/controllers";

const api = new Hono();

const { alignUsersWithSupabaseController, syncUserWithDBController } =
  userController;

api.get("/sync-users-accounts", alignUsersWithSupabaseController);

api.get("/sync-user", syncUserWithDBController);

export const userApi = api;
