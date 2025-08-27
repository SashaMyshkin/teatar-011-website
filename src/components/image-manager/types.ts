// Define PixelCrop type for cropping coordinates
type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Define component props
interface ImageManagerProps {
  onImageUpload: (image: Blob) => void;
  onImageDelete: () => void;
  aspectRatio: number | undefined;
  maxWidth: number;
  serverImage: string | null;
  altText: string | null;
}