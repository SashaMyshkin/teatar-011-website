import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import React from "react";
import { MembersUid, ParagraphRow } from "@/components/members/types";
import { useChange } from "@/components/context/ChangeContext";

export function useSelectMemberByIdentifier(identifier: string) {
  const [memberUidRow, setMemberUidRow] = React.useState<MembersUid | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Use a ref for cancellation flag
  const isCancelled = React.useRef(false);

  React.useEffect(() => {
    isCancelled.current = false; // Reset on each effect run

    async function fetchMemberUid() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseBrowserClient
        .from("members_uid")
        .select(
          `*`
        )
        .eq("identifier", identifier)
        .single()
       

      if (!isCancelled.current) {
        if (error) {
          setError(error.message || "Not found");
          setMemberUidRow(null);
        } else {
          setMemberUidRow(data);
        }
        setLoading(false);
      }
    }

    fetchMemberUid();

    return () => {
      isCancelled.current = true;
    };
  }, [identifier]);

  return { memberUidRow, loading, error };
}
