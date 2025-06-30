// useUser.ts
import { useLanguageContext } from "@/components/context/LanguageContext";
import { Database } from "@/lib/database.t";
import { useEffect, useState } from "react";

type Image = Database["public"]["Views"]["v_images"]["Row"];

export function useProfileImage(
  identifier: string,
  type: string
) {
  const [profileImageData, setProfileImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {scriptId}= useLanguageContext()

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchImages() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}/get-profile-image/`
        );


        // Build query params using URLSearchParams
        const params = new URLSearchParams({
          identifier,
          script_id: scriptId.toString(),
          type,
        });

        url.search = params.toString();

        const res = await fetch(url.toString(), { signal });
        if (!res.ok) {
          let apiErrorMsg = "";
          try {
            const errorBody = await res.json();
            apiErrorMsg = errorBody?.message ? `: ${errorBody.message}` : "";
          } catch(err) {
    
          }
          throw new Error(`Failed to fetch profile images ${apiErrorMsg}`);
        }

        const data = await res.json();
        setProfileImage(data);
      } catch (err: unknown) {
        if (signal.aborted) return; // fetch was cancelled, ignore
        console.error(err);
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setProfileImage(null)
        setError(message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    fetchImages();

    return () => {
      controller.abort();
    };
  }, [scriptId]);

  return { profileImageData, loading, error };
}
