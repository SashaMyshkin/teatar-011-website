import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import ImageManageWrapper from "@components/image-manager/ImageManageWrapper";
import { Image, ServerData } from "@components/image-manager/types";
import ListOfImages from "@components/image-manager/gallery/ImageList";
import { useMediaEntityType } from "@components/image-manager/hooks/useMediaEntityType";
import Loading from "@/components/loading/Loading";
import AltManager from "@components/image-manager/AltManager";

interface GalleryProps {
  images: Image[];
  futurePath: string;
  entityId: number;
}

const MEDIA_ENTITY_TYPE = "image-gallery";

export default function Gallery({
  images,
  futurePath,
  entityId,
}: GalleryProps) {
  const [open, setOpen] = React.useState(false);
  const { mediaEntityType } = useMediaEntityType(MEDIA_ENTITY_TYPE);
  const [serverData, setServerData] = React.useState<ServerData | null>(null);
  const [altData, setAltData] = React.useState<{alt:string | null, id:number | null} | null>(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setServerData(null);
    setAltData(null)
  };

  if (!mediaEntityType) return <Loading></Loading>;

  const defaults = {
    maxWidth: mediaEntityType.max_width,
    aspectRatio: mediaEntityType.aspect_ratio,
    entity_type_id: mediaEntityType.id,
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "fit-content", margin: "auto" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Dodaj sliku
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{zIndex:2000000}}>
        <DialogTitle></DialogTitle>
        <DialogContent sx={{width:"30rem"}}>
          <ImageManageWrapper
            serverData={serverData}
            defaults={defaults}
            futurePath={futurePath}
            entityId={entityId}
          />
          {altData && altData.id && <AltManager
            id={altData.id}
            altText={altData.alt ?? ""}
          ></AltManager>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
        </DialogActions>
      </Dialog>
      <ListOfImages
        itemData={images}
        setServerData={setServerData}
        setOpen={setOpen}
        setAltData={setAltData}
      />
    </React.Fragment>
  );
}
