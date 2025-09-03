import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { cardContentSx } from "../members/tabs/biography/styles";
import { Database } from "@/lib/database.t";
import Image from "next/image";

type RolesMembersView = Database["public"]["Views"]["v_roles_members"]["Row"];
interface RoleMemberCardProps {
  roleMember: RolesMembersView;
}

export default function RoleMemberCard({ roleMember }: RoleMemberCardProps) {
  return (
    <Card variant="outlined" sx={{ position: "relative", maxWidth: "15rem" }}>
      <CardContent sx={cardContentSx}>
        <Image src="/roleplaceholder.jpg" alt="placeholder" width={200} height={200}></Image><br></br>
        <Typography color="warning">{roleMember.role_name}</Typography> {roleMember.actor}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          /* onClick={handleSave}
            disabled={_.isEqual(roles[index], rolesChanges)}
            loading={loading}*/
        >
          Dodaj sliku
        </Button>
        <Button
          size="small"
          color="error"
          /*onClick={() => setRolesChanges(roles[index])}
            disabled={_.isEqual(roles[index], rolesChanges)}*/
        >
          Oduzmi ulogu
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
