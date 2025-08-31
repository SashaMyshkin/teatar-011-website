// useUser.ts
import { useChange } from "@/components/context/ChangeContext";
import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useEffect, useState } from "react";
import { UseProfileImageProps, Image } from "@components/image-manager/types";

export function useSelectImages({
  entity_id,
  type,
  image_id,
}: UseProfileImageProps) {
  const [imageData, setImageData] = useState<Image[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { language } = useLanguageContext();
  const {changeCount} = useChange();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchImages() {
      setLoading(true);
      setError(false);

      if (entity_id === undefined && image_id === undefined)
        return;

      try {
        const query = supabaseBrowserClient.from("v_images").select("*");
        query.eq("script_id", language.id);
        if (entity_id) query.eq("entity_id", entity_id);
        if (type) query.eq("type", type);
        if (image_id) query.eq("image_id", image_id);

        const result = await query;

        const data = unwrap(result);

        setImageData(data);
      } catch (err) {
        if (signal.aborted) return; // fetch was cancelled, ignore
        setImageData(null);
        setError(true);
        console.log(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    fetchImages();

    return () => {
      controller.abort();
    };
  }, [language.id, image_id, type, entity_id, changeCount]);

  return { imageData, loading, error };
}
