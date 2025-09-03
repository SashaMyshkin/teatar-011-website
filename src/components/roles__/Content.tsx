import { useEffect, useState } from "react";
import useSelectRolesPerPerformance from "./hooks/useSelectRolesPerPerformance";
import { Database } from "@/lib/database.t";
import { Divider, Stack } from "@mui/material";
import RoleMemberCard from "./RoleMemberCard";

interface ContentProps {
  performanceUid: number;
}

type RolesMembersView = Database["public"]["Views"]["v_roles_members"]["Row"];

const itemsPerColumn = 5;

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

  // Function to split items into columns with controlled items per column
  const createColumns = (items: RolesMembersView[], itemsPerColumn: number) => {
    const columns = [];

    for (let i = 0; i < items.length; i += itemsPerColumn) {
      columns.push(items.slice(i, i + itemsPerColumn));
    }

    return columns;
  };

  // Control how many items per column you want
  const columns = createColumns(rolesMembers, itemsPerColumn);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        marginTop: "2rem",
        height: "2rem",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {columns.map((columnItems, columnIndex) => (
        <>
          <Stack
            key={`${columnIndex}N`}
            spacing="0.8rem"
            sx={{
              flex: "1 1 auto",
              alignItems: "center",
            }}
          >
            {columnItems.map((p, i) => {
              const globalIndex =
                columns
                  .slice(0, columnIndex)
                  .reduce((sum, col) => sum + col.length, 0) + i;
              return <RoleMemberCard roleMember={p} />;
            })}
          </Stack>

          {/* Add divider between columns (but not after the last one) */}
          {columnIndex < columns.length - 1 && (
            <Divider orientation="vertical" sx={{ height: "100%" }} />
          )}
        </>
      ))}
    </Stack>
  );
}
