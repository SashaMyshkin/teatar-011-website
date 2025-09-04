import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import useInsertRole from "@components/performances/hooks/useInsertRole";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";

export default function Controles() {
  const { setRolesMembers } = usePerformanceContext();
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const insert = useInsertRole();

  const handleAddRole = async () => {
    setLoading(true);
    const result = await insert(roleName);
    setLoading(false);
    if (result) {
      setRoleName("");
      setRolesMembers((prev) => (prev ? [...prev, result] : [result]));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        mb: 2,
        justifyContent: "center",
      }}
    >
      <Box>
        <TextField
          id="role-name"
          name="role-name"
          label="Naziv nove uloge"
          margin="dense"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          color="secondary"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>
      <Box>
        <Button
          type="button"
          onClick={handleAddRole}
          loading={loading}
          variant="contained"
          sx={{ mt: 2 }}
          size="small"
          disabled={!roleName.trim().length || loading}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}
