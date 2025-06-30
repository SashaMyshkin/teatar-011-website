import React, { useState, useCallback } from "react";
import ImageManager from "./ImageManager";
import { useLanguageContext } from "../context/LanguageContext";
import { saveImageMetadata, uploadImageToSupabase } from "./imageUpload";

type ImageManagerParentProps = {
  newPathname: string;
  aspectRatio: number;
  maxWidth: number;
  serverPathname: string | null;
  altText: string | null;
  entity_id: number;
  entity_type_id: number;
};

export default function ImageManageWrapper({
  newPathname,
  aspectRatio,
  maxWidth,
  serverPathname,
  altText,
  entity_id,
  entity_type_id,
}: ImageManagerParentProps) {
  const [serverImage, setServerImage] = useState<string | null>(serverPathname);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const { scriptId } = useLanguageContext();

  const handleImageUpload = useCallback(
    async (croppedBlob: Blob): Promise<void> => {
      const tempUrl = URL.createObjectURL(croppedBlob);
      setServerImage(tempUrl);

      try {
        const savedImageInfo = await uploadImageToSupabase(croppedBlob, newPathname);
        await saveImageMetadata(savedImageInfo, {
          width,
          height,
          size: croppedBlob.size,
          alt: altText ?? "Default alt text",
          entity_id,
          script_id: scriptId,
          entity_type_id,
        });
        console.log("Image saved successfully.");
      } catch (error) {
        console.error("Error during image upload:", error);
      }
    },
    [newPathname, width, height, entity_id, entity_type_id, scriptId, altText]
  );

  const handleImageDelete = useCallback(async (): Promise<void> => {
    setServerImage(null);
    // Here, also implement deletion from Supabase if needed
  }, []);

  return (
    <ImageManager
      serverImage={serverImage}
      altText={altText}
      onImageUpload={handleImageUpload}
      onImageDelete={handleImageDelete}
      aspectRatio={aspectRatio}
      maxWidth={maxWidth}
      setWidth={setWidth}
      setHeight={setHeight}
    />
  );
}
