import { createClient } from "@/lib/server";
import { Database } from "@/lib/database.t";

type ParagraphToInsert =
  Database["public"]["Tables"]["members_biographies"]["Insert"];

export async function getMaxOrderNumber(member_uid: number) {
  const supabase = await createClient();

  const selected = await supabase
    .from("members_biographies")
    .select("order_number")
    .eq("member_uid", member_uid)
    .order("order_number", {ascending:false})
    .limit(1)
    .single();

  return selected;
}

export async function insertParagraph(data: ParagraphToInsert) {
  const supabase = await createClient();
  const insertedData = await supabase
    .from("members_biographies")
    .insert(data)
    .select()
    .single();

  return insertedData;
}
