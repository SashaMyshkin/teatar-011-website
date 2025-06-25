import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function Controls(){
  return(<React.Fragment>
    <Box sx={{display:"flex", flexDirection:"column", gap:"1rem"}}>
      <TextField
          id="outlined-multiline-static"
          label="Novi paragraf"
          multiline
          defaultValue="Default Value"
          fullWidth
        />
        <Button variant="contained">Sačuvaj</Button>
    </Box>
    
  </React.Fragment>)
}