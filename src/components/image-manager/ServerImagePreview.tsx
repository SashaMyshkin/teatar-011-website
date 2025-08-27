import { Box, Button, Card, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ServerImagePreview {
  onImageDelete: () => void;
  serverImage: string;
}

export default function ServerImagePreview({
  onImageDelete,
  serverImage,
}: ServerImagePreview) {
  return (
    <Card>
      <CardMedia component="img" image={serverImage} alt="Server content" />
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onImageDelete}
        >
          Obriši
        </Button>
      </Box>
    </Card>
  );
}
