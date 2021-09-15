import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import ScrollToTop from "../../common/components/ScrollToTop";
import CompletedMacro from "./completed/Macro";
import OverviewMacro from "./overview/OverviewMacro";
import ConnectionSuggesterMacro from "./suggestedConnections/ConnectionSuggesterMacro";

interface IAdminTab {
  accessToken: string;
  location: string;
}

const AdminTab: React.FC<IAdminTab> = ({ accessToken, location }) => {
  const [step, setStep] = useState<string>("2");

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
          <OverviewMacro location={location} accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <ConnectionSuggesterMacro
            location={location}
            accessToken={accessToken}
          />
        </TabPanel>
        <TabPanel value="3">
          <CompletedMacro accessToken={accessToken} location={location} />
        </TabPanel>
      </TabContext>
      <ScrollToTop maxPagePosition={300}/>
    </>
  );
};
export default AdminTab;