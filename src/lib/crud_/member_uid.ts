import type { Database } from "@/lib/database.t";
import { createClient } from "@/lib/server";

type MemberUIDInsert = Database["public"]["Tables"]["members_uid"]["Insert"];
type MemberUIDUpdate = Database["public"]["Tables"]["members_uid"]["Update"];

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

export async function memberUidUpdate(identifier:string,
  dataToUpdate: MemberUIDUpdate
) {
  const supabase = await createClient();

  const updatedData = await supabase
    .from("members_uid")
    .update(dataToUpdate)
    .eq('identifier', identifier)
    .select()
    .single();

    console.log(updatedData)

  return updatedData;
}

export async function getMemberUidByIdentifier(identifier:string
) {
  const supabase = await createClient();

  const selected = await supabase
    .from("members_uid")
    .select('id')
    .eq('identifier', identifier)
    .select()
    .single();


  return selected;
}