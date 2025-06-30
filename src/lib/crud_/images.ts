import { Database } from "@lib/database.t";
import { createClient } from "@lib/server";

type Image = Database["public"]["Tables"]["media_images"]["Insert"]
type ImageAlt = Database["public"]["Tables"]["media_images_alt"]["Insert"]
type ImageRelations = Database["public"]["Tables"]["media_images_relations"]["Insert"]

export async function insertImage(
  dataToInsert: Image
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("media_images")
    .insert(dataToInsert)
    .select()
    .single();

  return insertedData;
}

export async function insertImageAlt(
  dataToInsert: ImageAlt[]
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("media_images_alt")
    .insert(dataToInsert)
    .select()

  return insertedData;
}

export async function insertImageRelations(
  dataToInsert: ImageRelations
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("media_images_relations")
    .insert(dataToInsert)
    .select()
    .single();

  return insertedData;
}

export async function deleteImage(
  image_id: number
) {
  const supabase = await createClient();

  const insertedData = await supabase
    .from("media_images")
    .delete()
    .eq('id', image_id);

  return insertedData;
} 