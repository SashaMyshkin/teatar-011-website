import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useEffect, useState } from "react";
import {
  TablePerformancesAbout,
  UseSelectParagraphsProps,
} from "@components/performances/types";

export default function useSelectParagraphs({
  performanceUid,
}: UseSelectParagraphsProps) {
  const { language } = useLanguageContext();
  const [paragraphsData, setParagraphsData] = useState<
    TablePerformancesAbout[] | null
  >(null);
  const [errorParagraphs, setErrorParagraphs] = useState(false);
  const [loadingParagraphs, setLoadingParagraphs] = useState(false);

  useEffect(() => {
    async function fetchParagraphs() {
      try {
        if (performanceUid) {
          setLoadingParagraphs(true);
          setErrorParagraphs(false);
          const query = supabaseBrowserClient
            .from("performances_about")
            .select("*");
          query.eq("performance_uid", performanceUid);
          query.eq("script_id", language.id);
          query.order("order_number", { ascending: true, nullsFirst: false });
          const resultSet = await query;
          const data = unwrap(resultSet);
          setParagraphsData(data);
        }
      } catch (err) {
        console.log(err);
        setErrorParagraphs(true);
      } finally {
        setLoadingParagraphs(false);
      }
    }

    fetchParagraphs();
  }, [performanceUid, language.id]);

  return { paragraphsData, errorParagraphs, loadingParagraphs };
}
