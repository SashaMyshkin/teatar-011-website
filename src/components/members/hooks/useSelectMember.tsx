import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import {
  TablePerformances,
  UseSelectPerformanceProps,
} from "@components/performances/types";
import { useEffect, useState } from "react";
import { MembersRow, useSelectMemberProps } from "../types";

export default function useSelectMember({
  memberUid,
}: useSelectMemberProps) {
  const [memberData, setMemberData] =
    useState<MembersRow | null>(null);
  const [errorMember, setErrorMember] = useState(false);
  const [loadingMember, setLoadingMember] = useState(false);
  const { language } = useLanguageContext();

  useEffect(() => {
    async function fetchMember() {
      if (memberUid) {
        setLoadingMember(true);
        setErrorMember(false);

        try {
          const query = supabaseBrowserClient.from("members").select("*");
          query.eq("member_uid", memberUid);
          query.eq("script_id", language.id);

          const returned = unwrap(await query.single());
          setMemberData(returned);
        } catch (err) {
          console.error(err);
          setErrorMember(true);
        } finally {
          setLoadingMember(false);
        }
      }
    }

    fetchMember();
  }, [memberUid, language.id]);

  return { loadingMember, errorMember, memberData };
}
