"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Box, Tabs, Tab } from "@mui/material";

import BasicInfo from "@components/members/tabs/BasicInfo";
import BasicTextEditor from "@/components/basic-text-editor/BasicTextEditor";
import CustomTabPanel from "@/components/members/tabs/CustomTabPanel";
import Loading from "@/components/loading/Loading";

import { useSelectMember } from "@components/members/hooks/useSelectMember";
import { useSelectBiography } from "@components/members/hooks/useSelectBiography";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function MemberTabs() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { identifier } = useParams() as { identifier: string };

  const { memberData, loading: memberLoading } = useSelectMember(identifier);
  const { paragraphRows, loading: biographyLoading } = useSelectBiography(identifier);
  
  console.log(paragraphRows)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const renderBasicInfo = () => {
    if (memberLoading || !memberData) return <Loading />;
    return <BasicInfo initialFormState={memberData} />;
  };

  const renderBiography = () => {
    if (!paragraphRows) return null;
    const paragraphs = paragraphRows.map(({ id, paragraph, order_number, script_id }) => ({
      id,
      paragraph,
      order_number,
      script_id,
    }));
    return (
      <BasicTextEditor
        basicTextEditorProps={{
          loading: biographyLoading,
          paragraphs,
        }}
      />
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab label="Osnovni podaci" {...a11yProps(0)} />
          <Tab label="Biografija" {...a11yProps(1)} />
          <Tab label="Fotografija" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabIndex} index={0}>
        {renderBasicInfo()}
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        {renderBiography()}
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        Fotografija
      </CustomTabPanel>
    </Box>
  );
}
