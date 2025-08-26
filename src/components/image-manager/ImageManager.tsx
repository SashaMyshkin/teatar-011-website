import React, { useState, useCallback, useRef, ChangeEvent } from "react";
import Cropper, { Area } from "react-easy-crop"; // Import Area type from react-easy-crop
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

// Constants
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

// Helper function to generate cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

// Define PixelCrop type for cropping coordinates
type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is null");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        throw new Error("Canvas to Blob conversion failed");
      }
    }, "image/webp");
  });
};

// Define component props
interface ImageManagerProps {
  onImageUpload: (image: Blob) => void;
  onImageDelete: () => void;
  aspectRatio: number | undefined;
  maxWidth: number;
  serverImage: string | null;
  altText: string | null;
  setWidth: React.Dispatch<React.SetStateAction<null|number>>;
  setHeight: React.Dispatch<React.SetStateAction<null|number>>;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  serverImage,
  altText,
  onImageUpload,
  onImageDelete,
  setHeight,
  setWidth,
  aspectRatio,
  maxWidth,

}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setWidth(croppedAreaPixels.width)
    setHeight(croppedAreaPixels.height)
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels as PixelCrop
      );
      onImageUpload(croppedImage);
      resetState();
    } catch (e) {
      console.error("Error cropping image", e);
    }
  }, [croppedAreaPixels, imageSrc, onImageUpload]);

  const resetState = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelCrop = () => {
    resetState();
  };

  return (
    <Box sx={{ maxWidth: 350, m: "auto" }}>
      {serverImage ? (
        <Card>
          <CardMedia
            component="img"
            image={serverImage}
            alt="Server content"
            
          />
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onImageDelete}
            >
              Delete Image
            </Button>
          </Box>
        </Card>
      ) : imageSrc ? (
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
      ) : (
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
            Select Image
          </Button>
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Select an image to upload
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageManager;
