"use client"
import { Fab } from "@mui/material";
import React from "react";
import Dialog from "@/components/members/general-ui/Dialog";
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
      <Dialog open={open} setOpen={setOpen}></Dialog>
    </React.Fragment>
  );
}
