import React, { useState } from "react";
import CompletedMacro from "./completed/Macro";
import { Tab } from "@material-ui/core";
import { TabContext, TabPanel, TabList } from "@material-ui/lab";
import OverviewMacro from "./overview/OverviewMacro";

function AdminTab() {
  const [step, setStep] = useState<string>("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setStep(newValue);
  };

  return (
    <>
      <TabContext value={step}>
        <TabList onChange={handleChange} centered>
          <Tab label="Oversikt" value="1" />
          <Tab label="Foreslåtte koblinger" value="2" />
          <Tab label="Fullførte koblinger" value="3" />
        </TabList>
        <TabPanel value="1">
          <OverviewMacro />
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3">
          <CompletedMacro />
        </TabPanel>
      </TabContext>
    </>
  );
}
export default AdminTab;
