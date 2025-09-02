import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { useState } from "react";

export default function useDeleteRole() {
  const [error, setError] = useState(false);
  return async (roleUid: number) => {
    try {
      const result = await supabaseBrowserClient
        .from("performances_roles_uid")
        .delete()
        .eq("id", roleUid);

      unwrap(result);
    } catch (err) {
      setError(true);
      console.log(err);
    }

    return error;
  };
}
