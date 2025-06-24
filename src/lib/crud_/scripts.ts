import { createClient } from "@/lib/server";

export async function selectAllActiveScripts() {
  const supabase = await createClient();
  const result = await supabase.from("scripts").select("*").neq("status_id", 3);
  return result;
}
