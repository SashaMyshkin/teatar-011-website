import React, { useState, useCallback, useRef, ChangeEvent } from "react";
import { Area } from "react-easy-crop"; // Import Area type from react-easy-crop
import { Box } from "@mui/material";
import {
  compressAndResizeImage,
  toBlob,
  toFile,
} from "@/lib/helpers/imageCompression";
import ServerImagePreview from "./ServerImagePreview";
import CropperArea from "./CropperArea";
import ChooseImage from "./ChooseImage";
import { getCroppedImg } from "./utilis";

const ImageManager: React.FC<ImageManagerProps> = ({
  serverImage,
  onImageUpload,
  onImageDelete,
  aspectRatio,
  maxWidth,
  deleteLoading,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

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
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      setLoading(true);

      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels as PixelCrop
      );

      const compressedData = await compressAndResizeImage(
        toFile(croppedImage, "filename"),
        maxWidth
      );

      if (compressedData) {
        const imageFile = compressedData.file;
        const resizedBlob = toBlob(imageFile);
        await onImageUpload(resizedBlob);
      }

      resetState();
    } catch (e) {
      console.error("Error cropping image", e);
    } finally {
      setLoading(false);
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
    <>
      <Box sx={{ maxWidth: 350, m: "auto" }}>
        {serverImage ? (
          <ServerImagePreview
            onImageDelete={onImageDelete}
            serverImage={serverImage}
            deleteLoading={deleteLoading}
          ></ServerImagePreview>
        ) : imageSrc ? (
          <CropperArea
            imageSrc={imageSrc}
            crop={crop}
            zoom={zoom}
            aspectRatio={aspectRatio}
            setCrop={setCrop}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
            handleCancelCrop={handleCancelCrop}
            handleCropComplete={handleCropComplete}
            loading={loading}
          />
        ) : (
          <ChooseImage
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          ></ChooseImage>
        )}
      </Box>
    </>
  );
};

export default ImageManager;
