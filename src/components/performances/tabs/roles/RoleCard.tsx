
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, {  useEffect, useState } from "react";
import { ParagraphCardProps, RoleCardProps, RolesRow, TablePerformancesAbout } from "@components/performances/types";
import {
  cardContentSx,
  dragHandleStyle,
  textFieldInputProps,
  textFieldSx,
} from "@components/performances/tabs/roles/styles";
import _ from "lodash";
import useUpdateParagraph from "@components/performances/hooks/useUpdateParagraph";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import useDeleteParagraph from "@components/performances/hooks/useDeleteParagraph";



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

  /*const submit = useUpdateParagraph();
  const submitDelete = useDeleteParagraph();*/

  /*const handleDelete = async () => {
    if (paragraphs) {
      setLoadingDelete(true);
      const error = await submitDelete(paragraphs[index].id);
      if(!error){
        const newState = paragraphs.filter((elem)=>elem.id != paragraphs[index].id);
        setParagraphs(newState);
      }
      setLoadingDelete(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    if (paragraphs && paragraphChanges) {
      const data = await submit({
        id: paragraphs[index].id,
        paragraph: paragraphChanges.paragraph,
      });

      const newState = [...paragraphs];
      newState[index].paragraph = data.paragraph;

      setParagraphs(newState);
    }

    setLoading(false);
  };*/

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
          /*onClick={handleSave}*/
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
          /*onClick={handleDelete}
          loading={loadingDelete}*/
        >
          Obriši
        </Button>
      </CardActions>
    </Card>
  );
}


/*import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import Loading from "@/components/loading/Loading";

const itemsPerColumn = 5;
const columnWidth = 250;
export default function RoleCard() {
  const { roles } = usePerformanceContext();

  if (!roles) return <Loading></Loading>;

  const createColumns = () => {
    const columns = [];
    for (let i = 0; i < roles.length; i += itemsPerColumn) {
      columns.push(roles.slice(i, i + itemsPerColumn));
    }
    return columns;
  };

  const columns = createColumns();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        overflow: "auto",
        padding: 1,
        marginTop: "1rem",
      }}
    >
      {columns.map((columnData, columnIndex) => (
        <Paper
          sx={{
            width: columnWidth,
            padding: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexShrink: 0,
          }}
          key={columnIndex}
          elevation={2}
        >
          <List>
            {columnData.map((item, itemIndex) => (
              <ListItem disablePadding key={itemIndex}>
                <ListItemButton>
                  <ListItemText primary={item.role_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
}*/
