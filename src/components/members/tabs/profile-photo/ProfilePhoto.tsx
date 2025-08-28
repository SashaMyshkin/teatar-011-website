import { useMediaEntityType } from "@components/members/hooks/useMediaEntityType";
import { useProfileImage } from "@components/members/hooks/useSelectProfileImage";
import { useMemberContext } from "@components/members/MembersContext";
import Loading from "@/components/loading/Loading";
import ImageManageWrapper from "@/components/image-manager/ImageManageWrapper";
import { Box } from "@mui/material";
import AltManager from "@/components/image-manager/AltManager";

const MEDIA_ENTITY_TYPE = "image-profile";

export default function ProfilePhoto() {
  const { member_uid, identifier } = useMemberContext();
  const { profileImageData } = useProfileImage(member_uid, MEDIA_ENTITY_TYPE);
  const { mediaEntityType } = useMediaEntityType(MEDIA_ENTITY_TYPE);

  if (member_uid && mediaEntityType) {
    const serverData = profileImageData
      ? {
          publicUrl: profileImageData.public_url,
          alt: profileImageData.alt,
          imageId: profileImageData.image_id,
          path: profileImageData.path,
          width: profileImageData.width,
          height: profileImageData.height,
          size: profileImageData.size,
        }
      : null;

    const defaults = {
      maxWidth: mediaEntityType.max_width,
      aspectRatio: mediaEntityType.aspect_ratio,
      entity_type_id: mediaEntityType.id,
    };

    const alt_id =profileImageData?.alt_id

    return (
      <Box sx={{display:"flex", justifyContent:"center", gap:"2rem", width:"90%", margin:"auto"}}>
        <Box>
          <ImageManageWrapper
          serverData={serverData}
          defaults={defaults}
          futurePath={`members/${identifier}/${mediaEntityType.type}`}
          entityId={member_uid}
        />
        </Box>
        {
          alt_id && <Box sx={{ width:"350px"}}>
          <AltManager id={alt_id} altText={profileImageData.alt??""}></AltManager>
        </Box>
        }
        
        
      </Box>
    );
  } else {
    return <Loading></Loading>;
  }
}
