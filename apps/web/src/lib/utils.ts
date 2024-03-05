import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { storageKey } from "./supabase";
import type { Session } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSession = () => {
  const session = localStorage.getItem(storageKey);
  if (session) {
    return JSON.parse(session) as Session;
  }
};
