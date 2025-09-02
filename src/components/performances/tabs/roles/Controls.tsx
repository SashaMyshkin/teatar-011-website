import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

export default function Controls() {
  const [roleName, setRoleName] = useState<string>("");
  return (
    <Box
      sx={{ width: "30rem", margin: "auto", display: "flex", gap: "0.9rem" }}
    >
      <Box sx={{ width: "80%" }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="role-name"
          name="role-name"
          label="Naziv uloge"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={roleName}
          onChange={(e) => {
            setRoleName(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          width: "20%",
          margin: "auto",
          display: "flex",
          gap: "0.9rem",
          alignItems: "flex-end",
        }}
      >
        <Button
          fullWidth
          type="button"
          variant="contained"
          size="small"
          disabled={roleName === ""}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}
