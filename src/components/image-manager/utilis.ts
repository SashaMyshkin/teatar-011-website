import { supabaseBrowserClient } from "@/lib/client";

type UploadResult = {
  publicUrl: string;
  path: string;
};
const BUCKET = "teatar-011";

export async function uploadImageToSupabase(
  blob: Blob,
  pathname: string
): Promise<UploadResult> {
  const filename = `${pathname}-${Date.now()}`;
  const { data, error } = await supabaseBrowserClient.storage
    .from(BUCKET)
    .upload(filename, blob);

  if (error || !data) {
    throw new Error(error?.message || "Supabase upload failed");
  }

  const { data: publicInfo } = supabaseBrowserClient.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  if (!publicInfo) {
    throw new Error("Failed to get public URL");
  }

  return {
    publicUrl: publicInfo.publicUrl,
    path: data.path,
  };
}

type SaveMetadataOptions = {
  width: number | null;
  height: number | null;
  size: number;
  alt: string;
  entity_id: number | null;
  script_id: number;
  entity_type_id: number;
};

export async function saveImageMetadata(
  uploadResult: UploadResult,
  options: SaveMetadataOptions
) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}/save-image`;

  const payload = JSON.stringify({
    public_url: uploadResult.publicUrl,
    width: options.width,
    height: options.height,
    size: options.size,
    alt: options.alt,
    entity_id: options.entity_id,
    script_id: options.script_id,
    entity_type_id: options.entity_type_id,
    path: uploadResult.path,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  if (!response.ok) {
    throw new Error(`Failed to save image metadata: ${response.statusText}`);
  }

  return await response.json();
}

export function onImageDelete(path: string) {}

// Helper function to generate cropped image
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export const getCroppedImg = async (
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
