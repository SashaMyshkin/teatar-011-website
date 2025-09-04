import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { cardContentSx, dragHandleStyle } from "@components/members/tabs/biography/styles";
import { Database } from "@/lib/database.t";
import Image from "next/image";
import { RolesMembersRow } from "../../types";
import { use } from "react";
import { usePerformanceContext } from "../../context/PerformanceContext";


interface RoleMemberCardProps {

  dragHandle: React.ReactNode;
  index: number;
}

export default function RoleMemberCard({ dragHandle,index }: RoleMemberCardProps) {
  const {rolesMembers} = usePerformanceContext();
  return (
    <Card variant="outlined" sx={{ position: "relative", maxWidth: "15rem" }}>
       {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}
      <CardContent sx={cardContentSx}>
        <Image src="/roleplaceholder.jpg" alt="placeholder" width={200} height={200}></Image><br></br>
        <Typography color="warning">{rolesMembers[index].role_name}</Typography> 
        {rolesMembers[index].actor ? rolesMembers[index].actor : "Nije dodeljeno"}
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
