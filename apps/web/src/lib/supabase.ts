import { createClient } from "@supabase/supabase-js";

export const storageKey = "supabase.auth.the-job";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
  { auth: { storageKey } }
);
