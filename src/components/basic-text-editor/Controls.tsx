import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { SubmitResult } from "@components/custom-hooks/useSubmit";

export default function Controls({manageInsert}:{manageInsert:SubmitResult}) {
  const [paragraph, setParagraph] = React.useState("");

  const {submit} = manageInsert;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    await submit(form)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} component="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-multiline-static"
          label="Novi paragraf"
          multiline
          fullWidth
          value={paragraph}
          onChange={(e) => {
            setParagraph(e.target.value);
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ minWidth: "6rem" }}>
            Dodaj
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
