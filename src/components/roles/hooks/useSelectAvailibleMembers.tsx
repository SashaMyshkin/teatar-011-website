import { useLanguageContext } from "@/components/context/LanguageContext";
import { ViewMembers } from "@/components/members/types";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useEffect, useState } from "react";

export default function useSelectAvailibleMembers() {
  const { language } = useLanguageContext();

  return async function (performanceUid: number) {
    const excludedMembers = await supabaseBrowserClient
      .from("v_roles_members")
      .select("member_uid")
      .eq("performance_uid", performanceUid)
      .eq("script_id", language.id)
      .not("member_uid", "is", null);

    const excludedMembersData = unwrap(excludedMembers);

    const excludedUids =
      excludedMembersData
        ?.map((item) => item.member_uid)
        .filter((uid) => uid != null) || [];

    const queryResult = await supabaseBrowserClient
      .from("v_members")
      .select("*")
      .eq("is_public", 1)
      .eq("script_id", language.id)
      .not("member_uid", "in", `(${excludedUids.join(',')})`)
      .order("date_of_joining");

    const data = unwrap(queryResult);

    

    return data;
  };
}
