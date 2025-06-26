"use client";
import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type AutoCloseAlertProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  position?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
};

export function AutoCloseAlert({
  open,
  setOpen,
  message,
  severity = "info",
  autoHideDuration = 3000, // Increase to 3 seconds
  position = { vertical: "top", horizontal: "center" },
}: AutoCloseAlertProps) {
  
  React.useEffect(() => {
    console.log("Snackbar open state changed:", open);
  }, [open]);

  React.useEffect(() => {
    console.log("Snackbar mounted");
    return () => console.log("Snackbar unmounted");
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={position}
      sx={{ zIndex: 80000 }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
