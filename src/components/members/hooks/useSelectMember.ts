import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import React from "react";
import { NormalizedUpdateMemberForm } from "@/components/members/types";
import { normalizeMemberData } from "@/lib/helpers/members";

export function useSelectMember(identifier: string) {
  const [memberData, setMemberData] = React.useState<NormalizedUpdateMemberForm | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const languageContext = useLanguageContext();

  React.useEffect(() => {
    let isCancelled = false;

    async function fetchMember() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseBrowserClient
        .from("v_members")
        .select(
          `name, surname, identifier, date_of_joining, date_of_birth, membership_status_uid, motto, email`
        )
        .eq("identifier", identifier)
        .eq("script_id", languageContext.scriptId)
        .single();

      if (!isCancelled) {
        if (error || !data) {
          setError(error?.message || "Not found");
          setMemberData(null);
          router.push("/404"); // 👈 redirect to 404
        } else {
          setMemberData(normalizeMemberData(data));
        }
        setLoading(false);
      }
    }

    fetchMember();

    return () => {
      isCancelled = true;
    };
  }, [identifier, languageContext.scriptId, router]);

  return { memberData, loading, error };
}
