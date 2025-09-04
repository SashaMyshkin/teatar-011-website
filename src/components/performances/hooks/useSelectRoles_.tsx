import { useEffect, useState } from "react";
import { RolesRow, UseSelectRolesProps } from "@components/performances/types";
import { supabaseBrowserClient } from "@/lib/client";
import { useLanguageContext } from "@/components/context/LanguageContext";
import { unwrap } from "@/lib/errors/supabaseError";

export default function useSelectRoles({ performanceId }: UseSelectRolesProps) {
  const { language } = useLanguageContext();
  /*const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);*/
  const [rolesData, setRolesData] = useState<RolesRow[] | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      if (performanceId) {

        const queryResult = await supabaseBrowserClient
          .from("v_roles")
          .select("*")
          .eq("performance_uid", performanceId)
          .eq("script_id", language.id)
          .order("order_number", { ascending: true, nullsFirst: false });

        const data = unwrap(queryResult);

        setRolesData(data);
      }
    }

    fetchRoles();
  }, [performanceId, language.id]);

  return { rolesData };
}
