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
} from "@/components/members/tabs/biography/editor/styles";
import { ParagraphCardProps } from "@/components/members/tabs/biography/editor/types";
import { useSubmit } from "@/components/custom-hooks/useSubmit";
import { useAlert } from "@/components/context/AlertContext";
import { useChange } from "@/components/context/ChangeContext";

export default function ParagraphCard({
  id,
  initialText,
  dragHandle,
}: ParagraphCardProps) {
  const [text, setText] = React.useState(initialText);
  const {
    submit: updateSubmit,
    severity: updateSeverity,
    message: updateMessage,
    isLoading: updateLoading,
    success: updateSuccess,
  } = useSubmit(
    `/members-biographies/${id}`,
    "PUT",
    "Paragraf je uspešno izmenjen."
  );
  const { showAlert } = useAlert();
  const { notifyChange } = useChange();

  React.useEffect(() => {
    if (updateMessage !== "") {
      showAlert(updateMessage, updateSeverity);
    }
  }, [updateMessage, updateSeverity]);

  React.useEffect(() => {
    if (updateSuccess) {
      notifyChange();
    }
  }, [updateSuccess]);

  const handleSave = async () => {
    await updateSubmit({ paragraph: text });
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
          loading={updateLoading}
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
