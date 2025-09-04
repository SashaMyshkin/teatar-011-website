import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  cardContentSx,
  dragHandleStyle,
} from "@components/performances/tabs/roles/styles";
import Image from "next/image";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import {
  RoleMemberCardProps,
  RolesMembersRow,
} from "@components/performances/types";
import { useState } from "react";
import { useRolesContext } from "./RolesContext";
import { ViewMembers } from "@/components/members/types";

export default function RoleMemberCard({
  dragHandle,
  index,
}: RoleMemberCardProps) {
  const { membersData } = useRolesContext();
  const { rolesMembers } = usePerformanceContext();
  const [roleName, setRoleName] = useState(rolesMembers[index].role_name);
  const [selectedMember, setSelectedMember] = useState<ViewMembers | null>(
    membersData.find((m) => m.member_uid === rolesMembers[index].member_uid) ||
      null
  );

  return (
    <Card variant="outlined" sx={{ position: "relative", maxWidth: "15rem" }}>
      {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}
      <CardContent sx={cardContentSx}>
        <Image
          src="/roleplaceholder.jpg"
          alt="placeholder"
          width={200}
          height={200}
        ></Image>
        <br></br>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            mb: 2,
            justifyContent: "center",
          }}
        >
          <Box>
            <TextField
              id="role-name"
              name="role-name"
              margin="dense"
              type="text"
              fullWidth
              variant="standard"
              size="small"
              color="warning"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Box>
          {/*<Box>
        <Button
          type="button"
          /*onClick={handleAddRole}
          loading={loading}
          variant="contained"
          sx={{ mt: 2 }}
          size="small"
          //disabled={!roleName?.trim().length || loading}
        >
          Sačuvaj
        </Button>
      </Box>*/}
        </Box>
        <Box>
          <Autocomplete
            value={selectedMember}
            options={membersData}
            getOptionLabel={(option) => `${option.name} ${option.surname}`}
            onChange={(_, newValue) => setSelectedMember(newValue)} 
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
            sx={{ width:"100%", margin: "auto" }}
          />
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="success"
          /* onClick={handleSave}
            disabled={_.isEqual(roles[index], rolesChanges)}
            loading={loading}*/
        >
          Sačuvaj
        </Button>
        <Button
          size="small"
          color="error"
          /*onClick={() => setRolesChanges(roles[index])}
            disabled={_.isEqual(roles[index], rolesChanges)}*/
        >
          Obriši
        </Button>
        {/*<Button
            size="small"
            color="error"
            onClick={handleDelete}
            loading={loadingDelete}
          >
            Obriši
          </Button>*/}
      </CardActions>
    </Card>
  );
}
