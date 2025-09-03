import { useEffect, useState } from "react";
import useSelectRolesPerPerformance from "./hooks/useSelectRolesPerPerformance";
import { Database } from "@/lib/database.t";

interface ContentProps {
  performanceUid: number;
}

type RolesMembersView = Database["public"]["Views"]["v_roles_members"]["Row"];

export default function Content({ performanceUid }: ContentProps) {
  const select = useSelectRolesPerPerformance();
  const [rolesMembers, setRolesMembers] = useState<RolesMembersView[]>([]);

  useEffect(() => {
    async function fetchData() {
      const rolesMember = await select(performanceUid);
      setRolesMembers(rolesMember);
    }

    fetchData();
  }, [performanceUid]);

  return (
    <>
      {" "}
      
      <br />
      performanceUid: {performanceUid}
      <br />
      <br />
      
      {rolesMembers.map((e) => {
        return (
          <div>
            {e.role_name} - {e.actor}
          </div>
        );
      })}
    </>
  );
}
