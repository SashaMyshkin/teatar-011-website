import { Box } from "@mui/material";
import Controls from "@components/members/tabs/biography/Controls";
import Content from "@components/members/tabs/biography/Content";

export default function BiographyTab() {
  return (
    <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <Controls />
      <Content></Content>
    </Box>
  );
}
