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
import { useChange } from "@/components/context/ChangeContext";

export default function ParagraphCard({
  id,
  initialText,
  dragHandle,
}: ParagraphCardProps) {
  const [paragraph, setParagraph] = React.useState(initialText);
  const [paragraphChanges, setParagraphChanges] = React.useState(initialText);

  const {
    submit: updateSubmit,
    isLoading: updateLoading,
    success: updateSuccess,
  } = useSubmit(
    `/members-biographies/${id}`,
    "PUT",
    "Paragraf je uspešno izmenjen."
  );

   const {
    submit: deleteSubmit,
    isLoading: deleteLoading,
    success: deleteSuccess,
  } = useSubmit(
    `/members-biographies/${id}`,
    "DELETE",
    "Paragraf je uspešno obrisan."
  );
 
  const { notifyChange } = useChange();



  React.useEffect(() => {
    if (updateSuccess) {
      setParagraph(paragraphChanges)
    }
  }, [updateSuccess, setParagraph, paragraphChanges]);


  React.useEffect(() => {
    if (deleteSuccess) {
      notifyChange();
    }
  }, [deleteSuccess,notifyChange]);

  const handleSave = async () => {
    await updateSubmit({ paragraph: paragraphChanges });
  };

  const handleDelete = async () => {
    await deleteSubmit({});
  };

  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      {dragHandle && <div style={{ ...dragHandleStyle }}>{dragHandle}</div>}

      <CardContent sx={cardContentSx}>
        <TextField
          margin="none"
          fullWidth
          multiline
          value={paragraphChanges}
          id={`${id}`}
          onChange={(e) => setParagraphChanges(e.target.value)}
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
          disabled={paragraphChanges === paragraph}
          loading={updateLoading}
        >
          Izmeni
        </Button>
        <Button size="small" color="error" onClick={handleDelete} loading={deleteLoading}>
          Obriši
        </Button>
      </CardActions>
    </Card>
  );
}
