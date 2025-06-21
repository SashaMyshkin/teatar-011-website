import type { Database } from "@/lib/database.t";
import { createClient } from "@/lib/server";
type MemberUIDInsert = Database["public"]["Tables"]["members_uid"]["Insert"];

export async function memberUidInsert(
  dataToInsert: MemberUIDInsert
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("members_uid")
    .insert(dataToInsert)
    .select()
    .single();

  return insertedData;
}
