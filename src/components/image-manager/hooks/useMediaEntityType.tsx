import React from "react";

import { supabaseBrowserClient } from "@/lib/client";
import { Database } from "@/lib/database.t";

type MediaEntityType = Database["public"]["Tables"]["media_entity_types"]["Row"];

export function useMediaEntityType(type: string) {
  const [mediaEntityType, setMediaEntityType] = React.useState<MediaEntityType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    async function fetchEntityType() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseBrowserClient
        .from("media_entity_types")
        .select("*")
        .eq("type", type)
        .single();

      // Check if the component is still mounted before updating state
      if (!abortController.signal.aborted) {
        if (error) {
          setError(error.message || "Not found");
          setMediaEntityType(null);
        } else {
          setMediaEntityType(data);
        }
        setLoading(false);
      }
    }

    fetchEntityType();

    return () => {
      abortController.abort(); // This sets the signal's aborted flag to true
    };
  }, [type]);

  return { mediaEntityType, loading, error };
}