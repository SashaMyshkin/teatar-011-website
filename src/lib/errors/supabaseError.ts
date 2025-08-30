// utils/supabaseSafe.ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export class SupabaseError extends Error {
  code?: string;
  details?: string | null;

  constructor(error: {
    message: string;
    code?: string;
    details?: string | null;
  }) {
    super(`SupabaseError [${error.code ?? "unknown"}]: ${error.message}`);
    this.name = "SupabaseError";
    this.code = error.code;
    this.details = error.details;
  }
}

// Generic helper
export function unwrap<T>(res: PostgrestSingleResponse<T>): T {
  if (res.error) {
    throw new SupabaseError(res.error);
  }
  
  return res.data;
}
