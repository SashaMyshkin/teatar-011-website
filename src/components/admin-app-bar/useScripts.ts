import { supabaseBrowserClient } from "@/lib/client";
import { Database } from "@/lib/database.t";
import React from "react";

type Scripts = Database["public"]["Tables"]["scripts"]["Row"];

export function useScripts() {
  const [scripts, setScripts] = React.useState<Scripts[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCancelled = false;

    async function fetchScripts() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseBrowserClient
        .from("scripts")
        .select("*")
        .neq("status_id", 3);

      if (!isCancelled) {
        if (error) {
          setError(error.message);
          setScripts(null);
        } else {
          setScripts(data);
        }
        setLoading(false);
      }
    }

    fetchScripts();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { scripts, loading, error };
}
