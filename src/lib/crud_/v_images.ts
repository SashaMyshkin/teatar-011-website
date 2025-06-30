import { createClient } from "@lib/server";

export async function getMatchingImage(entity_id:number, type:string, script_id:number
) {
  const supabase = await createClient();

  const selected = await supabase
    .from("v_images")
    .select('*')
    .eq('entity_id', entity_id)
    .eq('script_id', script_id)
    .eq('type', type)
    .maybeSingle();


  return selected;
}