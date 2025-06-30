import React from "react";
import ImageManager from "./ImageManager";
import { supabaseBrowserClient } from "@/lib/client";
import { useLanguageContext } from "../context/LanguageContext";

const BUCKET = "teatar-011";

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
  const [serverImage, setServerImage] = React.useState<string | null>(
    serverPathname
  );
  const [width, setWidth] = React.useState<null | number>(null);
  const [height, setHeight] = React.useState<null | number>(null);
  const { scriptId } = useLanguageContext();

  const handleImageUpload = async (croppedBlob: Blob): Promise<void> => {
    const imageUrl = URL.createObjectURL(croppedBlob);
    setServerImage(imageUrl);

    try {
      const { data: uploadedInfo, error } = await supabaseBrowserClient.storage
        .from(BUCKET)
        .upload(`${newPathname}-${Date.now()}`, croppedBlob);

      if (error) {
        throw Error("Upload failed");
      }
      const { data: publicInfo } = supabaseBrowserClient.storage
        .from(BUCKET)
        .getPublicUrl(uploadedInfo.path);

      const json = JSON.stringify({
        pathname: publicInfo.publicUrl,
        width,
        height,
        size: croppedBlob.size,
        alt: "Hello world",
        supabase_id: uploadedInfo.id,
        entity_id,
        script_id: scriptId,
        entity_type_id,
      });

      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`);
      url.pathname += "/save-image";

      const result = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });

      const responseBody = await result.json();
      console.log(responseBody);
    } catch (err) {
      console.log(err);
    }

    //const { fullPath } = data;
    const c = croppedBlob;
  };

  const handleImageDelete = async (): Promise<void> => {
    setServerImage(null);
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
