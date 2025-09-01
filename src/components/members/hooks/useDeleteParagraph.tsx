import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useState } from "react";

export default function useDeleteParagraph() {
  const [error, setError] = useState(false);
  return async (paragraphId: number) => {
    try {
      const result = await supabaseBrowserClient
        .from("members_biographies")
        .delete()
        .eq("id", paragraphId);

      unwrap(result);
    } catch (err) {
      setError(true);
      console.log(err);
    }

    return error;
  };
}
