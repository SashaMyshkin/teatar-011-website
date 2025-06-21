import {
  Alert as AlertOriginal,
  AlertTitle,
  Box,
  Collapse,
} from "@mui/material";
import { AlertProps } from "@/components/alert/types";
import React from "react";

export default function Alert({ alertProps }: { alertProps: AlertProps }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={alertProps.open}>
        <AlertOriginal
          variant={alertProps.variant || "standard"}
          severity={alertProps.severity}
          icon={alertProps.icon}
          onClose={() => {}}
          action={alertProps.action}
          sx={{ mb: 2 }}
        >
          {alertProps.title && <AlertTitle>{alertProps.title}</AlertTitle>}
          {alertProps.message}
        </AlertOriginal>
      </Collapse>
    </Box>
  );
}
