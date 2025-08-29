import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { useEffect, useState } from "react";
import { PerformanceType } from "@components/performances/types";

export function useSelectTypes() {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<PerformanceType[] | null>(null);
  const { scriptId } = useLanguageContext();

  useEffect(() => {
    async function fetchTypes() {
      setLoading(true);
      const result = await supabaseBrowserClient
        .from("performances_types")
        .select("*")
        .eq("script_id", scriptId);

      if (result.data) {
        setTypes(result.data);
      }
      setLoading(false);
    }

    fetchTypes();
  }, [scriptId]);

 return {loading, types}
}
