import { Box, Button, TextField } from "@mui/material";

export default function Controls(){
  return ( <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      /*onSubmit={handleSubmit}*/
    >
      <TextField
        label="Uloga"
        multiline
        fullWidth
        /*value={newParagraph}
        onChange={(e) => setNewParagraph(e.target.value)}*/
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "6rem" }}
          /*loading={submitting}
          disabled={newParagraph === ""}*/
        >
          Dodaj
        </Button>
      </Box>
    </Box>)
}