import { supabaseBrowserClient } from "@/lib/client";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type AltProps = {
  id: number;
  altText: string;
};

export default function AltManager({ id, altText }: AltProps) {
  const [loading, setLoading] = useState(false);
  const [altSaved, setAltSaved] = useState(altText);
  const [alt, setAlt] = useState(altText);

  useEffect(()=>{
    setAlt(altText);
    setAltSaved(altText)
  },[altText])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await supabaseBrowserClient
      .from("media_images_alt")
      .update({ alt })
      .eq("id", id);
    setAltSaved(alt);
    setLoading(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        id="standard-basic"
        label="Alternativni tekst"
        variant="standard"
        size="small"
        value={alt}
        onChange={(e) => {
          setAlt(e.target.value);
        }}
        fullWidth
      />
      <Button
        variant="contained"
        size="small"
        type="submit"
        disabled={altSaved === alt}
        loading={loading}
      >
        Sačuvaj
      </Button>
    </Box>
  );
}
