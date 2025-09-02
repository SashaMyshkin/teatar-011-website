import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import { RolesRow } from "../types";

export default function useInsertRole() {
  const { performanceUid } = usePerformanceContext();
  const { language, languages } = useLanguageContext();

  return async (roleName: string): Promise<RolesRow | null> => {
    if (performanceUid) {
      const queryResult = await supabaseBrowserClient
        .from("performances_roles_uid")
        .insert([
          {
            performance_uid: performanceUid.id,
            description: roleName,
            importance: 0,
          },
        ])
        .select()
        .single();

      const { id: role_uid } = unwrap(queryResult);

      const localized = languages.map((elem) => {
        return {
          performance_role_uid: role_uid,
          script_id: elem.id,
          role_name: elem.id === language.id ? roleName : null,
        };
      });

      const result = await supabaseBrowserClient
        .from("performances_roles")
        .insert(localized);

      unwrap(result);

      return {
        description: roleName,
        importance: 0,
        performance_role_uid: role_uid,
        performance_uid: performanceUid.id,
        role_name: roleName,
        script_id: language.id,
      }
    }

    return null;


  };
}
