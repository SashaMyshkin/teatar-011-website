// useUser.ts
import { useChange } from "@/components/context/ChangeContext";
import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { Database } from "@/lib/database.t";
import { result } from "lodash";
import { useEffect, useState } from "react";

type Image = Database["public"]["Views"]["v_images"]["Row"];

export function useProfileImage(member_uid: number, type: string) {
  const [profileImageData, setProfileImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { scriptId } = useLanguageContext();
  const {changeCount} = useChange()

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchImages() {
      setLoading(true);
      setError(null);

      try {
        const resultSet = await supabaseBrowserClient
          .from("v_images")
          .select("*")
          .eq("entity_id", member_uid)
          .eq("script_id", scriptId)
          .eq("type", type)
          .maybeSingle();

        setProfileImage(resultSet.data);
      } catch (err) {
        if (signal.aborted) return; // fetch was cancelled, ignore
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setProfileImage(null);
        setError(message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    fetchImages();

    return () => {
      controller.abort();
    };
  }, [scriptId,changeCount]);

  return { profileImageData, loading, error };
}
