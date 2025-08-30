import React, { useState, useCallback } from "react";
import ImageManager from "@components/image-manager/ImageManager";
import { useLanguageContext } from "@components/context/LanguageContext";
import { saveImageMetadata, uploadImageToSupabase } from "@components/image-manager/utilis";
import { supabaseBrowserClient } from "@/lib/client";
import { getBlobDimensions } from "@/lib/helpers/imageCompression";
import { useChange } from "@components/context/ChangeContext";
import { ImageManagerParentProps } from "@components/image-manager/types";

export default function ImageManageWrapper({
  serverData,
  defaults,
  futurePath,
  entityId,
}: ImageManagerParentProps) {
  const [serverImage, setServerImage] = useState<string | null>(
    serverData?.publicUrl ?? null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { language } = useLanguageContext();
  const {id:scriptId} = language;
  const { notifyChange } = useChange();
 

  const handleImageUpload = useCallback(
    async (croppedBlob: Blob): Promise<void> => {
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
          alt: "",
          entity_id: entityId,
          script_id: scriptId,
          entity_type_id: defaults.entity_type_id,
        });

        setServerImage(URL.createObjectURL(croppedBlob));
        notifyChange();

        console.log("Image saved successfully. <3");
      } catch (error) {
        console.error("Error during image upload:", error);
      }
    },
    [defaults.entity_type_id, entityId, futurePath, notifyChange, scriptId]
  );

  const handleImageDelete = async (): Promise<void> => {
    if (serverData) {
      setDeleteLoading(true)
      await supabaseBrowserClient.storage
        .from("teatar-011")
        .remove([serverData.path ?? ""]);

      await supabaseBrowserClient
        .from("media_images")
        .delete()
        .eq("id", serverData.imageId ?? 0);
      setServerImage(null);
      setDeleteLoading(false);
      notifyChange();
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
        deleteLoading={deleteLoading}
      />
    </>
  );
}
