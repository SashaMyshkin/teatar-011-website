import { useMediaEntityType } from "@/components/image-manager/hooks/useMediaEntityType";
import { useMemberContext } from "@/components/members/context/MemberContext";
import Loading from "@/components/loading/Loading";
import ImageManageWrapper from "@/components/image-manager/ImageManageWrapper";
import { Box } from "@mui/material";
import AltManager from "@/components/image-manager/AltManager";
import { useSelectImage } from "@/components/image-manager/hooks/useSelectImage";

const MEDIA_ENTITY_TYPE = "image-profile";

export default function ProfilePhoto() {
  const { memberUid } = useMemberContext();
  const { imageData } = useSelectImage({
    entity_id: memberUid?.id,
    type: MEDIA_ENTITY_TYPE,
  });
  const { mediaEntityType } = useMediaEntityType(MEDIA_ENTITY_TYPE);

  if (memberUid && mediaEntityType) {
    const serverData = imageData
      ? {
          publicUrl: imageData.public_url,
          alt: imageData.alt,
          imageId: imageData.image_id,
          path: imageData.path,
          width: imageData.width,
          height: imageData.height,
          size: imageData.size,
        }
      : null;

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
            futurePath={`members/${memberUid.identifier}/${mediaEntityType.type}`}
            entityId={memberUid.id}
          />
        </Box>
        {imageData?.alt_id && (
          <Box sx={{ width: "350px" }}>
            <AltManager
              id={imageData.alt_id}
              altText={imageData.alt ?? ""}
            ></AltManager>
          </Box>
        )}
      </Box>
    );
  } else {
    return <Loading></Loading>;
  }
}
