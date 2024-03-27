import { createClient } from "@supabase/supabase-js";

export const storageKey = "supabase.auth.the-job";

if (
  !import.meta.env.VITE_SUPABASE_URL ||
  !import.meta.env.VITE_SUPABASE_API_KEY
) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_API_KEY");
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
  { auth: { storageKey } }
);
