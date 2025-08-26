import { useMediaEntityType } from "@/components/members_/hooks/useMediaEntityType";
import { useParams } from "next/navigation";
import { useProfileImage } from "@/components/members_/hooks/useSelectProfileImage";
import { useMemberContext } from "../../MembersContext";
import Loading from "@/components/loading/Loading";
import ImageManageWrapper from "@/components/image-manager/ImageManageWrapper";

const MEDIA_ENTITY_TYPE = "image-profile";

export default function ProfilePhoto() {
  const { member_uid, identifier } = useMemberContext();
  const { profileImageData } = useProfileImage(member_uid, MEDIA_ENTITY_TYPE);
  const { mediaEntityType } = useMediaEntityType(MEDIA_ENTITY_TYPE);

  console.log("member_uid: ", member_uid);
  console.log("mediaEntityType: ", mediaEntityType);
  console.log("profileImageData: ", profileImageData);

  if (member_uid && mediaEntityType) {
    const {
      aspect_ratio,
      max_width,
      id: entity_type_id,
      type: entity_type,
    } = mediaEntityType;

    const pathname = profileImageData?.pathname ?? null;
    const alt = profileImageData?.alt ?? null;

    return (
      <ImageManageWrapper
        aspectRatio={aspect_ratio}
        maxWidth={max_width}
        serverPathname={pathname}
        altText={alt}
        entity_type_id={entity_type_id}
        identifier={identifier}
        entity_type={entity_type}
        folder={"/members/"}
        entity_id={member_uid}
      />
    );
  } else {
    return <Loading></Loading>;
  }
}
