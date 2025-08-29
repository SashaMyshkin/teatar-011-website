import { supabaseBrowserClient } from "@/lib/client";

interface validatePublishingProps {
  member_uid: number;
  scriptId: number;
}

export async function validatePublishing({
  member_uid,
  scriptId,
}: validatePublishingProps) {
  const resultCheck: string[] = [];

  const motto = await supabaseBrowserClient
    .from("members")
    .select("id")
    .eq("member_uid", member_uid)
    .eq("script_id", scriptId)
    .neq("motto", null)

    .maybeSingle();

  if (!motto.data) {
    resultCheck.push("Popunite moto.");
  }

  const biography = await supabaseBrowserClient
    .from("members_biographies")
    .select("id")
    .eq("member_uid", member_uid)
    .eq("script_id", scriptId);

  if (biography.data && biography.data.length === 0) {
    resultCheck.push("Unesite bar jedan paragraf biografije člana.");
  }

  const image = await supabaseBrowserClient
    .from("media_images_relations")
    .select("image_id")
    .eq("entity_id", member_uid)
    .eq("entity_type_id", 2)
    .maybeSingle();

  if (!image.data) {
    resultCheck.push("Dodajte profilnu fotografiju člana.");
  }

  if (image.data?.image_id) {
    const alt = await supabaseBrowserClient
      .from("media_images_alt")
      .select("id")
      .eq("image_id", image.data.image_id)
      .eq("script_id", scriptId)
      .maybeSingle();

    if (!alt.data) {
      resultCheck.push("Dodajte alternativni tekst fotografiji člana.");
    }
  }

  return resultCheck;
}

export async function deleteValidation(member_uid: number) {
  const result: string[] = [];

  const awards = await supabaseBrowserClient
    .from("awards_festivals_members")
    .select("id")
    .eq("member_uid", member_uid);

  if (awards.data && awards.data.length > 0) {
    result.push(
      "Ovaj član je ostvario nagrade na festivalima i zato se ne može izbrisati iz baze podataka. Obrišite prvo njegove nagrade."
    );
  }

  return result;
}
