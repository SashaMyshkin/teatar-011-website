import React from "react";
import { Database } from "@/lib/database.t";
import { supabaseBrowserClient } from "@/lib/client";

type MediaEntityType = Database["public"]["Tables"]["media_entity_types"]["Row"]

export function useMediaEntityType(type: string) {
  const [mediaEntityType, setMediaEntityType] = React.useState<MediaEntityType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

   // Use a ref for cancellation flag
    const isCancelled = React.useRef(false);

  React.useEffect(() => {
      isCancelled.current = false; // Reset on each effect run
  
      async function fetchEntityType() {
        setLoading(true);
        setError(null);
  
        const { data, error } = await supabaseBrowserClient
          .from("media_entity_types")
          .select(
            `*`
          )
          .eq("type", type)
          
          .single();
  
        if (!isCancelled.current) {
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
        isCancelled.current = true;
      };
    }, [type]);

    return { mediaEntityType, loading, error };
}
