import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import BusinessInformation from "./Business/BusinessInformation";
import FaqContainer from "./Faq/FaqContainer";
import HowToStartGiEnJul from "./InfoPages/HowToStartGiEnJul";
import AddUser from "./Users/AddUser";
import ManageMunicipalityContainer from "./Municipality/ManageMunicipalityContainer";
import EventsTable from "./Events/EventsTable";
import { User } from "components/shared/Types";

interface IManageDashboard {
  user: User;
  accessToken: string;
}

const ManageDashboard: React.FC<IManageDashboard> = ({ accessToken, user }) => {
  const [tab, setTab] = useState<string>("4");

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
      <TabList onChange={handleChange} centered>
        <Tab hidden={user.role != "SuperAdmin"} label="FAQ" value="1" />
        <Tab hidden={user.role != "SuperAdmin"} label="Bedrift" value="2" />
        <Tab hidden={user.role != "SuperAdmin"} label="Hvordan starte Gi en jul" value="3" />
        <Tab label="Kommune" value="4" />
        <Tab hidden={user.role != "SuperAdmin"} label="Legg til/Slett Brukere" value="5" />
        <Tab hidden={user.role != "SuperAdmin"} label="Administrer eventer" value="6" />
      </TabList>
      <TabPanel value="1">
        <FaqContainer accessToken={accessToken} />
      </TabPanel>

      <TabPanel value="2">
        <BusinessInformation accessToken={accessToken} />
      </TabPanel>
      <TabPanel value="3">
        <HowToStartGiEnJul accessToken={accessToken} />
      </TabPanel>
      <TabPanel value="4">
        <ManageMunicipalityContainer
          accessToken={accessToken}
          assignedLocation={user.location ?? ""}
          role={user.role ?? ""}
        />
      </TabPanel>
      <TabPanel value="5">
        <AddUser accessToken={accessToken} />
      </TabPanel>
      <TabPanel value="6">
        <EventsTable accessToken={accessToken} />
      </TabPanel>
    </TabContext>
  );
};

export default ManageDashboard;
