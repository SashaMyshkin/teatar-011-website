import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RolesRow } from "../performances/types";
import { useRolesContext } from "./RolesContext";
import { ViewMembers } from "../members/types";
import useSelectAvailibleMembers from "./hooks/useSelectAvailibleMembers";
import useSelectAvailibleRoles from "./hooks/useSelectAvailibleRoles";
import { Database } from "@/lib/database.t";

interface ControlsProps {
  performanceUid:number;
  setPerformanceUid:Dispatch<SetStateAction<number>>
}

export type RolesMembersRow = Database["public"]["Views"]["v_roles_members"]["Row"];

export default function Controls({performanceUid, setPerformanceUid}:ControlsProps) {
  const selectAvailableRoles = useSelectAvailibleRoles();
  const { performancesData } = useRolesContext();
  const selectAvailableMembers = useSelectAvailibleMembers();
  const [membersData, setMembersData] = useState<ViewMembers[]>([]);
  const [roles, setRoles] = useState<RolesMembersRow[] | null>(null);
  const [role, setRole] = useState(0);
  const [member, setMember] = useState(0);

  useEffect(() => {
    async function fetchMembers() {
      const data = await selectAvailableMembers(performanceUid);
      setMembersData(data);
    }

    fetchMembers();
  }, [performanceUid]);

  useEffect(() => {
    async function fetchRoles() {
      const data = await selectAvailableRoles(performanceUid);
      setRoles(data);
    }

    fetchRoles();
  }, [performanceUid]);

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
    >
      <Box sx={{ width: "30%" }}>
        <TextField
          select
          margin="dense"
          id="performance-uid"
          name="performance-uid"
          label="Predstave"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={performanceUid}
          onChange={(event) => {
            setPerformanceUid(Number(event.target.value));
          }}
        >
          {performancesData ? (
            performancesData.map((elem) => {
              return (
                <MenuItem
                  key={elem.identifier}
                  value={elem.performance_uid ?? 0}
                >
                  {elem.title}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={0}>Učitava se...</MenuItem>
          )}
        </TextField>
      </Box>
      <Box sx={{ width: "30%" }}>
        <TextField
          select
          margin="dense"
          id="member-uid"
          name="member-uid"
          label="Članovi"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={member}
          onChange={(event) => {
            setMember(Number(event.target.value));
          }}
        >
          {membersData ? (
            membersData.map((elem) => {
              return (
                <MenuItem key={elem.identifier} value={elem.member_uid ?? 0}>
                  {elem.name} {elem.surname}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={0}>Učitava se...</MenuItem>
          )}
        </TextField>
      </Box>
      <Box sx={{ width: "30%" }}>
        <TextField
          select
          margin="dense"
          id="role-uid"
          name="role-uid"
          label="Uloge"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={role}
          onChange={(e) => {
            setRole(Number(e.target.value));
          }}
        >
          {roles ? (
            roles.map((elem) => {
              return (
                <MenuItem
                  key={elem.role_name}
                  value={elem.performance_role_uid ?? 0}
                >
                  {elem.role_name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={0}>Učitava se...</MenuItem>
          )}
        </TextField>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "10%" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "6rem" }}
          size="small"
        >
          Dodeli
        </Button>
      </Box>
    </Box>
  );
}
