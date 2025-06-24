import type { Database } from "@/lib/database.t";
import { createClient } from "@/lib/server";
type MemberInsert = Database["public"]["Tables"]["members"]["Insert"];
type MemberUpdate = Database["public"]["Tables"]["members"]["Update"];


export async function memberInsert(
  dataToInsert: MemberInsert[]
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("members")
    .insert(dataToInsert)
    .select();

  return insertedData;
}

export async function memberUpdate(
  member_uid:number,
  script_id:number,
  dataToUpdate: MemberUpdate
) {
  const supabase = await createClient();

  const updatedData = await supabase
    .from("members")
    .update(dataToUpdate)
    .eq("member_uid", member_uid)
    .eq("script_id", script_id)
    .select()
    .single();

  return updatedData;
}
