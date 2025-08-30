import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import {
  TablePerformancesUID,
  UseSelectPerformanceUidProps,
} from "@components/performances/types";
import { useEffect, useState } from "react";

export default function useSelectPerformanceUid({
  id,
  identifier,
}: UseSelectPerformanceUidProps) {
  const [performanceUidData, setPerformanceUidData] = useState<TablePerformancesUID | null>(null);
  const [errorPerformanceUid, setErrorPerformanceUid] = useState(false);
  const [loadingPerformanceUid, setLoadingPerformanceUid] = useState(false);

  useEffect(() => {
    async function fetchPerformanceUid() {
      if (id || identifier) {
        setLoadingPerformanceUid(true);
        setErrorPerformanceUid(false);

        try {
          const query = supabaseBrowserClient
            .from("performances_uid")
            .select("*");
          if (id) query.eq("id", id);
          if (identifier) query.eq("identifier", identifier);

          const returned = unwrap(await query.maybeSingle());
          setPerformanceUidData(returned);
        } catch (err) {
          console.error(err);
          setErrorPerformanceUid(true);
        } finally {
          setLoadingPerformanceUid(false);
        }
      }
    }

    fetchPerformanceUid();
  }, [id, identifier]);

  return { loadingPerformanceUid, errorPerformanceUid, performanceUidData };
}
