import React, { useState, useCallback } from "react";
import ImageManager from "./ImageManager";
import { useLanguageContext } from "../context/LanguageContext";
import { saveImageMetadata, uploadImageToSupabase } from "./utilis";

type ImageManagerParentProps = {
  identifier: string;
  entity_type: string;
  folder: string;
  aspectRatio: number;
  maxWidth: number;
  serverPathname: string | null;
  altText: string | null;
  entity_id: number;
  entity_type_id: number;
};

export default function ImageManageWrapper({
  aspectRatio,
  maxWidth,
  serverPathname,
  altText,
  entity_id,
  entity_type_id,
  entity_type,
  identifier,
  folder,
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
        const savedImageInfo = await uploadImageToSupabase(
          croppedBlob,
          `${folder}/${identifier}/${entity_type}`
        );
        
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
    [width, height, entity_id, entity_type_id, scriptId, altText]
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
