import { supabaseBrowserClient } from "@/lib/client";
import React from "react";
import { MembersUid } from "@/components/members_/types";

export function useSelectMemberByIdentifier(identifier: string) {
  const [memberUidRow, setMemberUidRow] = React.useState<MembersUid | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const abortController = new AbortController();

    async function fetchMemberUid() {
      setLoading(true);

      try {
        const { data, error } = await supabaseBrowserClient
          .from("members_uid")
          .select(`*`)
          .eq("identifier", identifier)
          .single();

        // Check if fetch was aborted before updating state
        if (!abortController.signal.aborted) {
          if (error) {
            setMemberUidRow(null);
          } else {
            setMemberUidRow(data);
          }
          setLoading(false);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching member UID:", err);
          setMemberUidRow(null);
          setLoading(false);
        }
      }
    }

    fetchMemberUid();

    return () => {
      abortController.abort(); // triggers signal.aborted
    };
  }, [identifier]);

  return { memberUidRow, loading };
}
