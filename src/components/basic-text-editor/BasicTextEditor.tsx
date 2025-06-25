"use client";

import { Box } from "@mui/material";
import React from "react";
import Controls from "@/components/basic-text-editor/Controls";
import Content from "@/components/basic-text-editor/Content";
import { BasicTextEditorProps } from "@/components/basic-text-editor/types";
import Loading from "@/components/loading/Loading";

export default function BasicTextEditor({
  basicTextEditorProps
}: {
  basicTextEditorProps: BasicTextEditorProps;
}) {
  const { paragraphs, loading, manageInsert } = basicTextEditorProps;
  return (
    <React.Fragment>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Box sx={{ display: "flex", gap: "1rem", flexDirection:"column" }}>
          <Box sx={{ width: "100%" }}>
            <Controls></Controls>
          </Box>
          <Box sx={{ width: "100%" }}>
            {paragraphs && <Content paragraphs={paragraphs}></Content>}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
}
