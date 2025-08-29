import { useAlert } from "@/components/context/AlertContext";
import { useChange } from "@/components/context/ChangeContext";
import { useLanguageContext } from "@/components/context/LanguageContext";
import { useSubmit } from "@/components/custom-hooks/useSubmit";
import { Box, Button, TextField } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

export default function Controls() {
  const { identifier } = useParams() as { identifier: string };
  const [paragraph, setParagraph] = React.useState("");
  const { submit, isLoading, success } = useSubmit(
    "/members-biographies",
    "POST",
    "Paragraf je uspešno dodat."
  );

  const { notifyChange } = useChange();
  const { scriptId } = useLanguageContext();

  React.useEffect(() => {
    if (success) {
      setParagraph("");
      notifyChange();
    }
  }, [success, notifyChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ paragraph, script_id: scriptId, identifier });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        label="Novi paragraf"
        multiline
        fullWidth
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "6rem" }}
          loading={isLoading}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}
