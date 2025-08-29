"use client"
import { Fab } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Dialog from "./Dialog";

export default function NewPerformance() {
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
        <AddIcon />
      </Fab>
      <Dialog open={open} setOpen={setOpen} />
      
    </React.Fragment>
  );
}
