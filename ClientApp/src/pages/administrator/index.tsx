import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import ScrollToTop from "components/shared/ScrollToTop";
import CompletedMacro from "components/admin/dashboard-completed/Macro";
import OverviewMacro from "components/admin/dashboard-all/OverviewMacro";
import ConnectionSuggesterMacro from "components/admin/connection-suggester/ConnectionSuggesterMacro";
import NavBarLoggedIn from "components/shared/navbar/NavBarLoggedIn";

interface IAdminTab {
  accessToken: string;
  location: string;
}

const AdminTab: React.FC<IAdminTab> = ({ accessToken, location }) => {
  const [step, setStep] = useState<string>("1");

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setStep(newValue);
  };

  return (
    <>
      <NavBarLoggedIn role="Admin" />
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
          <ConnectionSuggesterMacro location={location} accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="3">
          <CompletedMacro accessToken={accessToken} location={location} />
        </TabPanel>
      </TabContext>
      <ScrollToTop maxPagePosition={300} />
    </>
  );
};
export default AdminTab;
