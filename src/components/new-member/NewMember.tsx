import { Fab } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "./dialog/Dialog";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
        sx={{
          marginbottom:"none"
        }}
      >
        <PersonAddIcon />
      </Fab>
      <Dialog dialogProps={{open,setOpen}}></Dialog>
    </React.Fragment>
  );
}
