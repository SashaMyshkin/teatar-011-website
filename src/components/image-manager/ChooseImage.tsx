import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent } from "react";

interface ChooseImageProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function ChooseImage({
  fileInputRef,
  handleFileChange,
}: ChooseImageProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        border: "1px dashed grey",
        borderRadius: 1,
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        Odaberi sliku
      </Button>
      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Select an image to upload
      </Typography>
    </Box>
  );
}
