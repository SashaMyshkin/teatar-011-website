import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React from "react";
import {
  cardContentSx,
  dragHandleStyle,
  textFieldInputProps,
  textFieldSx,
} from "@components/basic-text-editor/styles";

type ParagraphCardProps = {
  id: string | number;
  initialText: string;
  dragHandle?: React.ReactNode;
};

export default function ParagraphCard({
  id,
  initialText,
  dragHandle,
}: ParagraphCardProps) {
  const [text, setText] = React.useState(initialText);

  const handleSave = () => {
    console.log("Save", { id, text });
  };

  const handleDelete = () => {
    console.log("Delete", id);
  };

  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}

      <CardContent sx={cardContentSx}>
        <TextField
          margin="none"
          fullWidth
          multiline
          value={text}
          id={`${id}`}
          onChange={(e) => setText(e.target.value)}
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
          disabled={initialText === text}
        >
          Izmeni
        </Button>
        <Button size="small" color="error" onClick={handleDelete}>
          Obriši
        </Button>
      </CardActions>
    </Card>
  );
}
