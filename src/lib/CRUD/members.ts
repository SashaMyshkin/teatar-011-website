import type { Database } from "@/lib/database.t";
import { createClient } from "@/lib/server";
type MemberInsert = Database["public"]["Tables"]["members"]["Insert"];

export async function memberInsert(
  dataToInsert: MemberInsert
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("members")
    .insert(dataToInsert)
    .select()
    .single();

  return insertedData;
}
