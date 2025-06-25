"use client";

import { Box } from "@mui/material";
import React from "react";
import Controls from "@/components/basic-text-editor/Controls";
import Content from "@/components/basic-text-editor/Content";

export default function BasicTextEditor() {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ width: "35%" }}>
          <Controls></Controls>
        </Box>
        <Box sx={{ width: "65%" }}>
          <Content></Content>
        </Box>
      </Box>
    </React.Fragment>
  );
}
