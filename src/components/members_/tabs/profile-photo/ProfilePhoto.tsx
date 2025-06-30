import { useMediaEntityType } from "@/components/members_/hooks/useMediaEntityType";
import { useParams } from "next/navigation";
import { useProfileImage } from "@/components/members_/hooks/useSelectProfileImage";
import ImageManageWrapper from "@/components/image-manager/ImageManageWrapper";
import { useEffect, useRef } from "react";
import { useSelectMember } from "@/components/members_/hooks/useSelectMember";
import { supabaseBrowserClient } from "@/lib/client";
import { useSelectMemberByIdentifier } from "@/components/members_/hooks/useSelectMemberByIdentifier";

const MEDIA_ENTITY_TYPE = "image-profile";

export default function ProfilePhoto() {
  const { identifier } = useParams() as { identifier: string };
  const { profileImageData } = useProfileImage(identifier, MEDIA_ENTITY_TYPE);
  const { mediaEntityType } = useMediaEntityType(MEDIA_ENTITY_TYPE);
  const { memberUidRow } = useSelectMemberByIdentifier(identifier);

  if (memberUidRow && mediaEntityType && profileImageData) {
    const { aspect_ratio, max_width, id:entity_type_id } = mediaEntityType;
    const { pathname, alt } = profileImageData;
    const { id: entity_id } = memberUidRow;
    const newPathname = `members/${identifier}/${MEDIA_ENTITY_TYPE}`;

    return (
      <ImageManageWrapper
        newPathname={newPathname}
        aspectRatio={aspect_ratio}
        maxWidth={max_width}
        serverPathname={pathname}
        altText={alt}
        entity_id={entity_id}
        entity_type_id={entity_type_id}
      />
    );
  } else {
    return <>Loading...</>;
  }
}
