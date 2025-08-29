"use client";

import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CustomTabPanel from "@/components/members/tabs/CustomTabPanel";
import BasicInfoTab from "@/components/members/tabs/basic-info/BasicInfoTab";
import BiographyTab from "@/components/members/tabs/biography/BiographyTab";
import ProfilePhoto from "@/components/members/tabs/profile-photo/ProfilePhoto";
import { ChangeProvider } from "@/components/context/ChangeContext";
import Publishing from "@/components/members/tabs/publishing/Publishing";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function MemberTabs() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab label="Osnovni podaci" {...a11yProps(0)} />
          <Tab label="Biografija" {...a11yProps(1)} />
          <Tab label="Fotografija" {...a11yProps(2)} />
          <Tab label="Objavljivanje" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabIndex} index={0}>
        <BasicInfoTab />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <BiographyTab />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <ChangeProvider>
          <ProfilePhoto />
        </ChangeProvider>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={3}>
        <Publishing/>
      </CustomTabPanel>
    </Box>
  );
}
