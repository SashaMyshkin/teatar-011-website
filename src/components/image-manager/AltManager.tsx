import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type AltProps = {
  id:number,
  altDefault:string
}

export default function AltManager({id,altDefault}:AltProps) {
  const [alt, setAlt] = useState(altDefault)
  return (
    <Box sx={{width:"100%", display:"flex", flexDirection:"column", gap:"0.5rem"}} component="form">
      <TextField
        id="standard-basic"
        label="Alternativni tekst"
        variant="standard"
        size="small"
        value={alt}
        onChange={(e)=>{setAlt(e.target.value)}}
        fullWidth
      />
      <Button variant="contained" size="small" type="submit">Sačuvaj</Button>
    </Box>
  );
}
