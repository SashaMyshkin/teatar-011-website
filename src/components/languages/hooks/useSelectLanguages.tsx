import { useEffect, useState } from "react";
import { Language } from "../types";
import { supabaseBrowserClient } from "@/lib/client";

export default function useSelectLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        setLoading(true);
        const result = await supabaseBrowserClient.from("scripts").select("*");
        if (result.error) setError(true);
        if (result.data) setLanguages(result.data);

        setLoading(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();
  }, []);

  return { loading, languages, error };
}
