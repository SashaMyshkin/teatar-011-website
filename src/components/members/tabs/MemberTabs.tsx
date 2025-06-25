"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BasicInfo from "@components/members/tabs/BasicInfo";
import { useSelectMember } from "@components/members/hooks/useSelectMember";
import { useParams } from "next/navigation";
import Loading from "@/components/loading/Loading";
import BasicTextEditor from "@/components/basic-text-editor/BasicTextEditor";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MemberTabs() {
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const identifier = String(params.identifier);
  const { memberData } = useSelectMember(identifier);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered={true}
        >
          <Tab label="Osnovni podaci" {...a11yProps(0)} />
          <Tab label="Biografija" {...a11yProps(1)} />
          <Tab label="Fotografija" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {memberData == null ? (
          <Loading></Loading>
        ) : (
          <BasicInfo
            initialFormState={memberData}
          ></BasicInfo>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BasicTextEditor/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Fotografija
      </CustomTabPanel>
    </Box>
  );
}
