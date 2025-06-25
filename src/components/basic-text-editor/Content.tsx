import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

export default function Content() {
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <TextField fullWidth multiline> some biography</TextField>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">Sačuvaj</Button>
            <Button size="small" color="secondary">Poveži sliku</Button>
            <Button size="small" color="error">Obriši</Button>
            
          </CardActions>
        </Card>
      </Stack>
    </React.Fragment>
  );
}
