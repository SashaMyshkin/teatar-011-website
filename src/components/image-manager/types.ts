import { Database } from "@/lib/database.t";

// Define PixelCrop type for cropping coordinates
export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Define component props
export interface ImageManagerProps {
  onImageUpload: (image: Blob) => Promise<void>;
  onImageDelete: () => void;
  aspectRatio: number | undefined;
  maxWidth: number;
  serverImage: string | null;
  deleteLoading:boolean
}

export type ImageManagerParentProps = {
  serverData: {
    publicUrl: string | null;
    alt: string  | null;
    imageId: number  | null;
    path: string  | null;
    width: number  | null;
    height: number  | null;
    size: number  | null;
  } | null;

  defaults: {
    maxWidth: number;
    aspectRatio: number;
    entity_type_id: number;
  };

  futurePath:string;

  entityId: number  | null;

};

export type Image = Database["public"]["Views"]["v_images"]["Row"];
export interface UseProfileImageProps {
  entity_id?: number;
  image_id?: number;
  type?: string;
}
