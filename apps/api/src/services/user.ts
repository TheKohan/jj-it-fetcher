import { userModel } from "@fetcher-api/models";

const { alignUsersWithSupabase, syncUserWithDB } = userModel;

export const userService = {
  alignUsersWithSupabase,
  syncUserWithDB,
};
