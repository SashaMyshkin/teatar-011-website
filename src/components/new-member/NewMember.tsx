import { Fab } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "./dialog/Dialog";

export default function NewMember() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog dialogProps={{open,setOpen}}></Dialog>
    </React.Fragment>
  );
}
