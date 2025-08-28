import imageCompression from "browser-image-compression";

// File -> Blob
export const toBlob = (file: File): Blob => {
  return file.slice(0, file.size, file.type);
};

// Blob -> File
export const toFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

export const getBlobDimensions = (blob: Blob): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(url); // cleanup
    };

    img.onerror = (err) => {
      reject(err);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
};


export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(url); // cleanup
    };

    img.onerror = (err) => {
      reject(err);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
};



export const compressAndResizeImage = async (file: File, targetWidth: number) => {
  const options = {
    maxWidthOrHeight: targetWidth, // resizes longest side to this value
    maxSizeMB: 1,                  // optional: limit file size in MB
    initialQuality: 0.7,           // 0–1 quality
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(file, options);

    // If you need a preview URL:
    const compressedBlobUrl = URL.createObjectURL(compressedFile);

    return { file: compressedFile, preview: compressedBlobUrl };
  } catch (err) {
    console.error("Compression failed:", err);
    return null;
  }
};