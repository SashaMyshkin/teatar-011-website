import { Box, Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import useInsertParagraph from "@components/members/hooks/useInsertParagraph";

export default function Controls(){
  const [newParagraph, setNewParagraph] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = useInsertParagraph();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setSubmitting(true);
    await submit(newParagraph);
    setSubmitting(false);
    setNewParagraph("");
  }

  return(
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Novi paragraf"
        multiline
        fullWidth
        value={newParagraph}
        onChange={(e) => setNewParagraph(e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "6rem" }}
          loading={submitting}
          disabled={newParagraph === ""}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  )
}