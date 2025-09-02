import { useLanguageContext } from "@/components/context/LanguageContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";

interface UpdateRoleProps {
  id: number;
  role_name?: string;
  order_number?: number;
}

export default function useUpdateRole() {
  const { language } = useLanguageContext();
  const { performanceUid } = usePerformanceContext();
  return async ({ id, role_name, order_number }: UpdateRoleProps) => {
    if (!(role_name || order_number))
      throw new Error(
        "Potrebno je proslediti bar jedan parametar: role_name ili order_number"
      );

    const updateData: Partial<Omit<UpdateRoleProps, "id">> = {};
    if (role_name !== undefined) updateData.role_name = role_name;
    if (order_number !== undefined) updateData.order_number = order_number;

    if (role_name) {
      const result = await supabaseBrowserClient
        .from("performances_roles")
        .update(updateData)
        .eq("performance_role_uid", id)
        .eq("script_id", language.id);

      unwrap(result);
    }

    if (order_number) {
      const result = await supabaseBrowserClient
        .from("performances_roles_uid")
        .update(updateData)
        .eq("id", id);

      unwrap(result);
    }

    
      const queryResult = await supabaseBrowserClient
        .from("v_roles")
        .select("*")
        .eq("performance_uid", performanceUid?.id ?? 0)
        .eq("script_id", language.id)
        .eq("performance_role_uid", id)
        .single();

      return unwrap(queryResult)
  
  };
}
