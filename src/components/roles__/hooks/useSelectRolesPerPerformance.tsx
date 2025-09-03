import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { Database } from "@/lib/database.t";
import { unwrap } from "@/lib/errors/supabaseError";
import { useState } from "react";

export default function useSelectRolesPerPerformance() {
  const { language } = useLanguageContext();

  return async (performanceUid: number) => {
    const roles = await supabaseBrowserClient
      .from("v_roles_members")
      .select("*")
      .eq("performance_uid", performanceUid)
      .eq("script_id", language.id)
      .order("order_number");

    const data = unwrap(roles);


    return data;
  };
}
