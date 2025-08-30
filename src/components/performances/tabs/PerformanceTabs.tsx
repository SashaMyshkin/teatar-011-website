"use client";

import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CustomTabPanel from "@/components/performances/tabs/CustomTabPanel";
import BasicDataTab from "@/components/performances/tabs/basic-data/BasicDataTab";
import AboutPerformance from "./about-performance/AboutPerformance";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function PerformanceTabs() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab label="Osnovni podaci" {...a11yProps(0)} />
          <Tab label="Detalji" {...a11yProps(1)} />
          <Tab label="O predstavi" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabIndex} index={0}>
        <BasicDataTab/>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        Detalji
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <AboutPerformance/>
      </CustomTabPanel>
    </Box>
  );
}
