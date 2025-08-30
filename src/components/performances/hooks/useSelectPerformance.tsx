import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import {
  TablePerformances,
  UseSelectPerformanceProps,
} from "@components/performances/types";
import { useEffect, useState } from "react";

export default function useSelectPerformance({
  performanceUid,
}: UseSelectPerformanceProps) {
  const [performanceData, setPerformanceData] =
    useState<TablePerformances | null>(null);
  const [errorPerformance, setErrorPerformance] = useState(false);
  const [loadingPerformance, setLoadingPerformance] = useState(false);
  const { language } = useLanguageContext();

  useEffect(() => {
    async function fetchPerformance() {
      if (performanceUid) {
        setLoadingPerformance(true);
        setErrorPerformance(false);

        try {
          const query = supabaseBrowserClient.from("performances").select("*");
          query.eq("performance_uid", performanceUid);
          query.eq("script_id", language.id);

          const returned = unwrap(await query.single());
          setPerformanceData(returned);
        } catch (err) {
          console.error(err);
          setErrorPerformance(true);
        } finally {
          setLoadingPerformance(false);
        }
      }
    }

    fetchPerformance();
  }, [performanceUid, language.id]);

  return { loadingPerformance, errorPerformance, performanceData };
}
