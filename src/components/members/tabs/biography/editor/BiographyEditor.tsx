"use client";

import { Box, Alert } from "@mui/material";
import React from "react";
import Content from "@/components/members/tabs/biography/editor/Content";
import Controls from "@/components/members/tabs/biography/editor/Controls";
import { useParams } from "next/navigation";
import { useSelectBiography } from "@/components/members/hooks/useSelectBiography";
import Loading from "@/components/loading/Loading";

export default function BiographyEditor() {
  const { identifier } = useParams() as { identifier: string };
  const { paragraphRows, loading, error } = useSelectBiography(identifier);

  const renderContent = () => {
    if (loading) return <Loading />;
    if (error) return <Alert severity="error">No data to display</Alert>;
    if (paragraphRows) return <Content paragraphRows={paragraphRows} />;
    return null;
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <Controls />
      {renderContent()}
    </Box>
  );
}
