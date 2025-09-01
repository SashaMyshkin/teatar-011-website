"use client";

import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CustomTabPanel from "@/components/performances/tabs/CustomTabPanel";
import BasicDataTab from "@/components/performances/tabs/basic-data/BasicDataTab";
import AboutPerformance from "@/components/performances/tabs/about-performance/AboutPerformance";
import Poster from "@components/performances/tabs/poster/Poster";
import { ChangeProvider } from "@/components/context/ChangeContext";
import PerformanceGallery from "@/components/performances/tabs/performance-gallery/PerformanceGallery";
import Roles from "@components/roles/Roles";

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
          <Tab label="Poster" {...a11yProps(3)} />
          <Tab label="Galerija" {...a11yProps(4)} />
          <Tab label="Uloge" {...a11yProps(5)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabIndex} index={0}>
        <BasicDataTab />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        Detalji
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <AboutPerformance />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={3}>
        <ChangeProvider>
          <Poster />
        </ChangeProvider>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={4}>
        <ChangeProvider>
          <PerformanceGallery />
        </ChangeProvider>
      </CustomTabPanel>
       <CustomTabPanel value={tabIndex} index={5}>
        <Roles />
      </CustomTabPanel>
    </Box>
  );
}
