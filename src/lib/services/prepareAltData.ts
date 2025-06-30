import { Database } from "@/lib/database.t";

type ImagesAlt = Database["public"]["Tables"]["media_images_alt"]["Insert"];
type ScriptSelect = Database["public"]["Tables"]["scripts"]["Row"];

export function generateLocalizedAltRecords(
  data: ImagesAlt,
  scripts: ScriptSelect[]
):ImagesAlt[] {
  return scripts.map((script) => {
    return {
      image_id:data.image_id,
      alt: script.id === data.script_id?data.alt:null,
      script_id: script.id,
    };
  });
}
