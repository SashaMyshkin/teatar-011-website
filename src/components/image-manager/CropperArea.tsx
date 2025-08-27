import { Box, Button, Slider, Typography } from "@mui/material";
import Cropper, { Area } from "react-easy-crop";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

interface CropperAreaProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  aspectRatio: number | undefined;
  setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onCropComplete: (_: Area, croppedAreaPixels: Area) => void;
  handleCancelCrop: () => void;
  handleCropComplete: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

export default function CropperArea({
  imageSrc,
  crop,
  zoom,
  aspectRatio,
  setCrop,
  setZoom,
  onCropComplete,
  handleCancelCrop,
  handleCropComplete
}: CropperAreaProps) {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: 400,
          width: "100%",
          bgcolor: "grey.200",
          mb: 2,
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        />
      </Box>

      <Box sx={{ mb: 2, px: 2 }}>
        <Typography variant="body2" gutterBottom>
          Zoom: {zoom.toFixed(1)}
        </Typography>
        <Slider
          value={zoom}
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={ZOOM_STEP}
          onChange={(_: Event, value: number | number[]) =>
            setZoom(Array.isArray(value) ? value[0] : value)
          }
          aria-labelledby="Zoom"
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelIcon />}
          onClick={handleCancelCrop}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={handleCropComplete}
        >
          Apply Crop
        </Button>
      </Box>
    </Box>
  );
}
