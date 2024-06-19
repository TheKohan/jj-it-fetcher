import type { Handler } from "hono";
import { scrapingService } from "../services/scraping";
import { userService } from "@fetcher-api/services";
import { getUserCtx } from "@fetcher-api/utils";

const { alignUsersWithSupabase, syncUserWithDB } = userService;

const alignUsersWithSupabaseController: Handler = async c => {
  const data = await alignUsersWithSupabase();
  return c.json({ data });
};

const syncUserWithDBController: Handler = async c => {
  const { id, email } = getUserCtx(c);
  const data = await syncUserWithDB(id, email);
  return c.json({ data });
};

export const userController = {
  alignUsersWithSupabaseController,
  syncUserWithDBController,
};
