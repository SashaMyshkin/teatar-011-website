import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useEffect, useState } from "react";
import { MembersUidRow, UseSelectMemberUidProps } from "../types";

export default function useSelectMemberUid({
  id,
  identifier,
}: UseSelectMemberUidProps) {
  const [memberUidData, setMemberUidData] = useState<MembersUidRow | null>(null);
  const [errorMemberUid, setErrorMemberUid] = useState(false);
  const [loadingMemberUid, setLoadingMemberUid] = useState(false);

  useEffect(() => {
    async function fetchMemberUid() {
      if (id || identifier) {
        setLoadingMemberUid(true);
        setErrorMemberUid(false);

        try {
          const query = supabaseBrowserClient
            .from("members_uid")
            .select("*");
          if (id) query.eq("id", id);
          if (identifier) query.eq("identifier", identifier);

          const returned = unwrap(await query.maybeSingle());
          setMemberUidData(returned);
        } catch (err) {
          console.error(err);
          setErrorMemberUid(true);
        } finally {
          setLoadingMemberUid(false);
        }
      }
    }

    fetchMemberUid();
  }, [id, identifier]);

  return { loadingMemberUid, errorMemberUid, memberUidData };
}
