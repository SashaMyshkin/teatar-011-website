import { supabaseBrowserClient } from "@/lib/client";
import { Dispatch, SetStateAction } from "react";
import { validatePublishing } from "@components/members/tabs/publishing/validation";

interface toogleActivationProps {
  member_uid: number;
  isActive: boolean;

  setIsActive: Dispatch<SetStateAction<boolean>>;
}

interface tooglePublishingProps {
  isPublic: boolean;
  member_uid: number;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
}

export async function toogleActivation({
  member_uid,
  isActive,
  setIsActive,
}: toogleActivationProps) {
  const value = !isActive ? 1 : 0;

  try {
    await supabaseBrowserClient
      .from("members_uid")
      .update({ is_active: value })
      .eq("id", member_uid);

    setIsActive(!isActive);
  } catch (err) {
    console.error("Članu se nije izmenio status Aktivacije.");
  }

  return;
}

export async function tooglePublishing({
  member_uid,

  isPublic,
  setIsPublic,
}: tooglePublishingProps) {
  const value = !isPublic ? 1 : 0;

  try {
    await supabaseBrowserClient
      .from("members_uid")
      .update({ is_public: value })
      .eq("id", member_uid);

    setIsPublic(!isPublic);
  } catch (err) {
    console.error("Član nije objavljen na sajtu");
  }

  return;
}

export async function deleteMember(member_uid: number) {
  await supabaseBrowserClient.from("members_uid").delete().eq("id", member_uid);
  return;
}
