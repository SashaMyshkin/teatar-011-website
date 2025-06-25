import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import React from "react";
import { ParagraphRow } from "@/components/members/types";

export function useSelectBiography(identifier: string) {
  const [paragraphRows, setParagraphRows] = React.useState<ParagraphRow[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const languageContext = useLanguageContext();

  React.useEffect(() => {
    let isCancelled = false;

    async function fetchBiography() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseBrowserClient
        .from("members_biographies")
        .select(
          `id, paragraph, order_number, script_id, member_uid, members_uid!inner(id)`
        )
        .eq("members_uid.identifier", identifier)
        .eq("script_id", languageContext.scriptId);

      if (!isCancelled) {
        if (error) {
          setError(error?.message || "Not found");
          setParagraphRows(null);
        } else {
          setParagraphRows(data);
        }
        setLoading(false);
      }
    }

    fetchBiography();

    return () => {
      isCancelled = true;
    };
  }, [identifier, languageContext.scriptId]);

  return { paragraphRows, loading, error };
}
