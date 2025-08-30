import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import React from "react";
import { ParagraphRow } from "@/components/members/types";
import { useChange } from "@/components/context/ChangeContext";

export function useSelectBiography(identifier: string) {
  const [paragraphRows, setParagraphRows] = React.useState<ParagraphRow[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { language } = useLanguageContext();
  const {id:scriptId} = language;
  const {changeCount} = useChange()

  // Use a ref for cancellation flag
  const isCancelled = React.useRef(false);

  React.useEffect(() => {
    isCancelled.current = false; // Reset on each effect run

    async function fetchBiography() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseBrowserClient
        .from("members_biographies")
        .select(
          `id, paragraph, order_number, script_id, member_uid, members_uid!inner(id)`
        )
        .eq("members_uid.identifier", identifier)
        .eq("script_id", scriptId)
        .order("order_number");

      if (!isCancelled.current) {
        if (error) {
          setError(error.message || "Not found");
          setParagraphRows(null);
        } else {
          setParagraphRows(data);
        }
        setLoading(false);
      }
    }

    fetchBiography();

    return () => {
      isCancelled.current = true;
    };
  }, [identifier, scriptId, changeCount]);

  return { paragraphRows, loading, error };
}
