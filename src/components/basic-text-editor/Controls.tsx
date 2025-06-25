import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function Controls() {
  const [paragraph, setParagraph] = React.useState("");

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
