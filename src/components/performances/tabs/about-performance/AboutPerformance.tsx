import { Box } from "@mui/material";
import Controls from "@components/performances/tabs/about-performance/Controls";
import Content from "./Content";

export default function AboutPerformance(){
  
  return(
    <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <Controls/>
       <Content></Content>
    </Box>
  )
}