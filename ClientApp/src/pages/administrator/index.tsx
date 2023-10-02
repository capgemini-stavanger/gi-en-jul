import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import ScrollToTop from "components/shared/ScrollToTop";
import CompletedMacro from "components/admin/dashboard-completed/Macro";
import NavBarLoggedIn from "components/shared/navbar/NavBarLoggedIn";
import ManageDashboard from "components/superadmin/ManageDashboard";
import OverviewMacroRemake from "components/admin/dashboard-all/OverviewMacroRemake";
import { User } from "components/shared/Types";

interface IAdminTab {
  accessToken: string;
  user: User;
}

const AdminTab: React.FC<IAdminTab> = ({ accessToken, user }) => {
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
          <Tab label="Fullførte koblinger" value="2" />
          <Tab label="Administrer" value="3" />
        </TabList>
        <TabPanel value="1">
          <OverviewMacroRemake user={user} accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <CompletedMacro accessToken={accessToken} location={user.location ?? ""} />
        </TabPanel>
        <TabPanel value="3">
          <ManageDashboard accessToken={accessToken} user={user} />
        </TabPanel>
      </TabContext>
      <ScrollToTop maxPagePosition={300} />
    </>
  );
};
export default AdminTab;

/*
<Tab label="Foreslåtte koblinger" value="2" />
<TabPanel value="2">
  <ConnectionSuggesterMacro location={location} accessToken={accessToken} />
</TabPanel>
*/
