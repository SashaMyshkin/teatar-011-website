import React, { useState, useCallback } from "react";
import ImageManager from "./ImageManager";
import { useLanguageContext } from "../context/LanguageContext";
import { saveImageMetadata, uploadImageToSupabase } from "./utilis";
import { supabaseBrowserClient } from "@/lib/client";
import { getBlobDimensions } from "@/lib/helpers/imageCompression";

export default function ImageManageWrapper({
  serverData,
  defaults,
  futurePath,
}: ImageManagerParentProps) {
  const [serverImage, setServerImage] = useState<string | null>(
    serverData?.publicUrl ?? null
  );
  const [width, setWidth] = useState<number | null>(serverData?.width ?? null);
  const [height, setHeight] = useState<number | null>(
    serverData?.height ?? null
  );
  const [size, setSize] = useState<number | null>(serverData?.size ?? null);
  const { scriptId } = useLanguageContext();

  const handleImageUpload = useCallback(
    async (croppedBlob: Blob): Promise<void> => {
      setServerImage(URL.createObjectURL(croppedBlob));

      try {
        const savedImageInfo = await uploadImageToSupabase(
          croppedBlob,
          futurePath
        );

        const { width: blobWidth, height: blobHeight } =
          await getBlobDimensions(croppedBlob);

        await saveImageMetadata(savedImageInfo, {
          width: blobWidth,
          height: blobHeight,
          size: croppedBlob.size,
          alt: "Default alt text",
          entity_id: serverData?.entityId ?? null,
          script_id: scriptId,
          entity_type_id: defaults.entity_type_id,
        });

        setWidth(blobWidth);
        setHeight(blobHeight);
        setSize(croppedBlob.size);

        console.log("Image saved successfully.");
      } catch (error) {
        console.error("Error during image upload:", error);
      }
    },
    []
  );

  const handleImageDelete = async (): Promise<void> => {
    if (serverData) {
      await supabaseBrowserClient.storage
        .from("teatar-011")
        .remove([serverData.path ?? ""]);

      await supabaseBrowserClient
        .from("media_images")
        .delete()
        .eq("id", serverData.imageId ?? 0);
      setServerImage(null);
    }
  };

  return (
    <>
      <ImageManager
        serverImage={serverImage}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
        aspectRatio={defaults.aspectRatio}
        maxWidth={defaults.maxWidth}
      />
    </>
  );
}
