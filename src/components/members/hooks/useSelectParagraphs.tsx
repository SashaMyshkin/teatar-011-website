import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useEffect, useState } from "react";
import {
  MembersBiographies,
  UseSelectParagraphsProps,
} from "@components/members/types";

export default function useSelectParagraphs({
  memberUid,
}: UseSelectParagraphsProps) {
  const { language } = useLanguageContext();
  const [paragraphsData, setParagraphsData] = useState<
    MembersBiographies[] | null
  >(null);
  const [errorParagraphs, setErrorParagraphs] = useState(false);
  const [loadingParagraphs, setLoadingParagraphs] = useState(false);

  useEffect(() => {
    async function fetchParagraphs() {
      try {
        if (memberUid) {
          setLoadingParagraphs(true);
          setErrorParagraphs(false);
          const query = supabaseBrowserClient
            .from("members_biographies")
            .select("*");
          query.eq("member_uid", memberUid);
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
  }, [memberUid, language.id]);

  return { paragraphsData, errorParagraphs, loadingParagraphs };
}
