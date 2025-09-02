
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, {  useEffect, useState } from "react";
import { RoleCardProps, RolesRow } from "@components/performances/types";
import {
  cardContentSx,
  dragHandleStyle,
  textFieldInputProps,
  textFieldSx,
} from "@components/performances/tabs/roles/styles";
import _ from "lodash";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import useUpdateRole from "@components/performances/hooks/useUpdateRole";
import useDeleteRole from "@components/performances/hooks/useDeleteRole";



export default function RoleCard({
  index,
  dragHandle,
}: RoleCardProps) {
  const { roles, setRoles } = usePerformanceContext();
  const [rolesChanges, setRolesChanges] =
    React.useState<RolesRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    if (roles) {
      setRolesChanges(roles[index]);
    }
  }, [roles,index]);

  const submit = useUpdateRole();
  const submitDelete = useDeleteRole();

  const handleDelete = async () => {
    if (roles) {
      setLoadingDelete(true);
      const error = await submitDelete(roles[index].performance_role_uid ?? 0);
      if(!error){
        const newState = roles.filter((elem)=>elem.performance_role_uid != roles[index].performance_role_uid);
        setRoles(newState);
      }
      setLoadingDelete(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    if (roles && rolesChanges) {
      await submit({
        id: roles[index].performance_role_uid ?? 0,
        role_name: rolesChanges.role_name ?? "",
      });

      const newState = [...roles];
      newState[index].role_name = rolesChanges.role_name;

      setRoles(newState);
    }

    setLoading(false);
  };

  if (!(rolesChanges && roles)) return <></>;

  return (
    <Card variant="outlined" sx={{ position: "relative", maxWidth:"15rem" }}>
      {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}

      <CardContent sx={cardContentSx}>
        <TextField
          margin="none"
          fullWidth
          multiline
          value={rolesChanges.role_name}
          id={`${rolesChanges.performance_role_uid}`}
          onChange={(e) =>
            setRolesChanges((elem) => {
              if (!elem) return null;
              return { ...elem, role_name: e.target.value };
            })
          }
          variant="standard"
          slotProps={{ input: textFieldInputProps }}
          sx={textFieldSx}
        />
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleSave}
          disabled={_.isEqual(roles[index], rolesChanges)}
          loading={loading}
        >
          Izmeni
        </Button>
        <Button
          size="small"
          color="warning"
          onClick={() => setRolesChanges(roles[index])}
          disabled={_.isEqual(roles[index], rolesChanges)}
        >
          Otkaži
        </Button>
        <Button
          size="small"
          color="error"
          onClick={handleDelete}
          loading={loadingDelete}
        >
          Obriši
        </Button>
      </CardActions>
    </Card>
  );
}
