import { supabaseBrowserClient } from "@/lib/client";
import { Dispatch, SetStateAction } from "react";
import { MembersUidRow } from "../../types";
import { unwrap } from "@/lib/errors/supabaseError";

interface toogleActivationProps {
  member_uid: number;
  isActive: boolean;
  setMemberUid: Dispatch<SetStateAction<MembersUidRow | null>>;
}

interface tooglePublishingProps {
  isPublic: boolean;
  member_uid: number;
  setMemberUid: Dispatch<SetStateAction<MembersUidRow | null>>;
}

export async function toogleActivation({
  member_uid,
  isActive,
  setMemberUid,
}: toogleActivationProps) {
  const value = !isActive ? 1 : 0;

  try {
    const res = await supabaseBrowserClient
      .from("members_uid")
      .update({ is_active: value })
      .eq("id", member_uid)
      .select("*")
      .single();

    const newMemberUid = unwrap(res);

    setMemberUid(newMemberUid);
  } catch (err) {
    console.error("Članu se nije izmenio status Aktivacije.", err);
  }

  return;
}

export async function tooglePublishing({
  member_uid,

  isPublic,
  setMemberUid,
}: tooglePublishingProps) {
  const value = !isPublic ? 1 : 0;

  try {
    const res = await supabaseBrowserClient
      .from("members_uid")
      .update({ is_public: value })
      .eq("id", member_uid)
      .select("*")
      .single();

    const newState = unwrap(res);

    setMemberUid(newState);
  } catch (err) {
    console.error("Član nije objavljen na sajtu", err);
  }

  return;
}

export async function deleteMember(member_uid: number) {
  await supabaseBrowserClient.from("members_uid").delete().eq("id", member_uid);
  return;
}
