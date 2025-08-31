import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Image, ServerData } from "@components/image-manager/types";

interface ListOfImagesProps {
  itemData: Image[];
  setServerData: React.Dispatch<React.SetStateAction<ServerData | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAltData: React.Dispatch<
    React.SetStateAction<{ alt: string | null; id: number | null } | null>
  >;
}

export default function ListOfImages({
  itemData,
  setOpen,
  setServerData,
  setAltData,
}: ListOfImagesProps) {
  const handleOpen = (
    serverData: ServerData,
    altData: { alt: string | null; id: number | null }
  ) => {
    setServerData(serverData);
    setAltData(altData);
    setOpen(true);
  };

  return (
    <ImageList
      sx={{ width: 600, height: "auto", margin: "auto", marginTop: "1rem" }}
      cols={3}
      rowHeight="auto"
    >
      {itemData.map((item) => (
        <ImageListItem key={item.path}>
          <img
            style={{ cursor: "pointer" }}
            srcSet={`${item.public_url}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.public_url}?w=200&h=200&fit=crop&auto=format`}
            alt={item.alt ?? ""}
            loading="lazy"
            onClick={() => {
              handleOpen(
                {
                  publicUrl: item.public_url,
                  alt: item.alt,
                  imageId: item.image_id,
                  path: item.path,
                  width: item.width,
                  height: item.height,
                  size: item.size,
                },
                {
                  id: item.alt_id,
                  alt: item.alt,
                }
              );
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
