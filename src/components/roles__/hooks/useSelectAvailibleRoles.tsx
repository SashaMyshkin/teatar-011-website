import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";

export default function useSelectAvailibleRoles() {
  const { language } = useLanguageContext();

  return async function (performanceUid: number) {
    const queryResult = await supabaseBrowserClient
      .from("v_roles_members")
      .select("*")
      .eq("performance_uid", performanceUid)
      .eq("script_id", language.id)
      .is("member_uid", null)
      .order("order_number");

    const data = unwrap(queryResult);

    return data
  };
}
