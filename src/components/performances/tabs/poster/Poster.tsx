import AltManager from "@/components/image-manager/AltManager";
import { useMediaEntityType } from "@/components/image-manager/hooks/useMediaEntityType";
import ImageManageWrapper from "@/components/image-manager/ImageManageWrapper";
import Loading from "@/components/loading/Loading";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Image } from "@/components/image-manager/types";
import { useSelectImage } from "@/components/image-manager/hooks/useSelectImage";

const MEDIA_ENTITY_TYPE = "image-poster";

export default function Poster() {
  const { mediaEntityType } = useMediaEntityType(MEDIA_ENTITY_TYPE);
  const { performanceUid } = usePerformanceContext();
  const {imageData} = useSelectImage({type:"image-poster", entity_id:performanceUid?.id});
  const [poster, setPoster] = useState<Image | null>(null);

  useEffect(()=>{
    setPoster(imageData)
  },[imageData])

   const serverData = poster
      ? {
          publicUrl: poster.public_url,
          alt: poster.alt,
          imageId: poster.image_id,
          path: poster.path,
          width: poster.width,
          height: poster.height,
          size: poster.size,
        }
      : null;

    if(!mediaEntityType || !performanceUid) return <Loading></Loading>

    const defaults = {
      maxWidth: mediaEntityType.max_width,
      aspectRatio: mediaEntityType.aspect_ratio,
      entity_type_id: mediaEntityType.id,
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        width: "90%",
        margin: "auto",
      }}
    >
      <Box>
        <ImageManageWrapper
          serverData={serverData}
          defaults={defaults}
          futurePath={`performances/${performanceUid.identifier}/${mediaEntityType.type}`}
          entityId={performanceUid.id}
        />
      </Box>
      {poster?.alt_id && (
        <Box sx={{ width: "350px" }}>
          <AltManager
            id={poster?.alt_id}
            altText={poster?.alt ?? ""}
          ></AltManager>
        </Box>
      )}
    </Box>
  );
}
