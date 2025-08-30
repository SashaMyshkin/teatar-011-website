import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React from "react";
import { TablePerformancesAbout } from "../../types";
import { cardContentSx, dragHandleStyle, textFieldInputProps, textFieldSx } from "./styles";
import _ from "lodash";

interface ParagraphCardProps {
  paragraphObject: TablePerformancesAbout;
  dragHandle: React.ReactNode;
}

export default function ParagraphCard({
  paragraphObject,
  dragHandle,
}: ParagraphCardProps) {
  const [paragraph, setParagraph] = React.useState<TablePerformancesAbout>(paragraphObject);
  const [paragraphChanges, setParagraphChanges] = React.useState<TablePerformancesAbout>(paragraphObject);

  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}

      <CardContent sx={cardContentSx}>
        <TextField
          margin="none"
          fullWidth
          multiline
          value={paragraphChanges.paragraph}
          id={`${paragraph.id}`}
          onChange={(e) => setParagraphChanges((elem)=>{return {...elem, paragraph:e.target.value}})}
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
          disabled={_.isEqual(paragraph, paragraphChanges)}
          /*loading={updateLoading}*/
        >
          Izmeni
        </Button>
        <Button
          size="small"
          color="error"
         /* onClick={handleDelete}
          loading={deleteLoading}*/
        >
          Obriši
        </Button>
      </CardActions>
    </Card>
  );
}
