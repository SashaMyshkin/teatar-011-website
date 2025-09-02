import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import useInsertRole from "@components/performances/hooks/useInsertRole";
import { usePerformanceContext } from "../../context/PerformanceContext";

export default function Controls() {
  const {setRoles, roles} = usePerformanceContext()
  const [roleName, setRoleName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const insert = useInsertRole();


  const handleInsert = async () =>{
    setLoading(true);
    const data = await insert(roleName);

    if(data && roles){
      const newState = [...roles, data]
      setRoles(newState);
    }

    setLoading(false);
    setRoleName("");

  }

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
          onClick={handleInsert}
          loading={loading}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}
