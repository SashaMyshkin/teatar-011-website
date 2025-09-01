import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { Database } from "@/lib/database.t";
import { unwrap } from "@/lib/errors/supabaseError";
import { useEffect, useState } from "react";
import { MembershipStatusesRow } from "../types";



export default function useSelectMembershipStatuses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [membershipStatuses, setMembershipStatuses] = useState<
    MembershipStatusesRow[] | null
  >(null);
  const { language } = useLanguageContext();

  useEffect(() => {
    async function fetchStatuses() {
      try {
        setLoading(true);
        const result = await supabaseBrowserClient
          .from("members_membership_status")
          .select("*")
          .eq("script_id", language.id);

        const data = unwrap(result);

        setMembershipStatuses(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStatuses();
  }, [language.id]);

  return { loading, membershipStatuses, error };
}
