import React, { useState, useCallback } from "react";
import ImageManager from "./ImageManager";
import { useLanguageContext } from "../context/LanguageContext";
import { saveImageMetadata, uploadImageToSupabase } from "./utilis";
import { supabaseBrowserClient } from "@/lib/client";

type ImageManagerParentProps = {
  identifier: string;
  entity_type: string;
  folder: string;
  aspectRatio: number;
  maxWidth: number;
  publicUrl: string | null;
  altText: string | null;
  entity_id: number;
  entity_type_id: number;
  path: string | null;
  image_id: number | null;
};

export default function ImageManageWrapper({
  aspectRatio,
  maxWidth,
  publicUrl,
  altText,
  entity_id,
  entity_type_id,
  entity_type,
  identifier,
  folder,
  image_id,
  path,
}: ImageManagerParentProps) {
  const [serverImage, setServerImage] = useState<string | null>(publicUrl);
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

  const handleImageDelete = async (): Promise<void> => {
    if (serverImage && image_id && path) {
      await supabaseBrowserClient.storage.from("teatar-011").remove([path]);

      await supabaseBrowserClient
        .from("media_images")
        .delete()
        .eq("id", image_id);
      setServerImage(null);
    }
  };

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
