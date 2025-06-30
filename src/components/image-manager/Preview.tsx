import { Box, Button, Card, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Preview(serverImage: string, path: string) {
  const handleDelete = () => {};

  return (
    <Card>
      <CardMedia
        component="img"
        image={serverImage}
        alt="Server content"
        sx={{ maxHeight: 400 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Obriši
        </Button>
      </Box>
    </Card>
  );
}
