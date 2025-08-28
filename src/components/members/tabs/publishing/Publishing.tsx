import { Box, Button, Checkbox } from "@mui/material";
import { useMemberContext } from "@components/members/MembersContext";
import { useEffect, useState } from "react";
import { supabaseBrowserClient } from "@/lib/client";

export default function Publishing() {
  const { member_uid, isActive, isPublic } = useMemberContext();

  return (
    <>
      <Box sx={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          margin: "auto",
          gap: "2rem",
          justifyContent:"center",
          marginBottom:"2rem"
        }}>
        <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} color="primary" checked={isActive} readOnly/>
        <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} color="primary" checked={isPublic} readOnly/>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
          gap: "2rem",
        }}
      >
        {!isActive && !isPublic && (
          <Box>
            <Button variant="contained" color="success" fullWidth>
              Proglasi aktivnim
            </Button>
          </Box>
        )}
        {isActive && !isPublic && (
          <Box>
            <Button variant="contained" color="warning" fullWidth>
              Proglasi neaktivnim
            </Button>
          </Box>
        )}
        {isActive && !isPublic && (
          <Box>
            <Button variant="contained" color="success" fullWidth>
              Objavi na sajtu
            </Button>
          </Box>
        )}
        {isActive && isPublic && (
          <Box>
            <Button variant="contained" color="error" fullWidth>
              Ukloni sa sajta
            </Button>
          </Box>
        )}

        {!isActive && !isPublic && (
          <Box>
            <Button variant="contained" color="error" fullWidth>
              Obriši
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
