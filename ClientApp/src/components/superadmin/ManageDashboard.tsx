import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import useStyles from "components/superadmin/Styles";
import React, { useState } from "react";
import { Container } from "reactstrap";
import BusinessInformation from "./Business/BusinessInformation";
import FaqContainer from "./Faq/FaqContainer";
import HowToStartGiEnJul from "./InfoPages/HowToStartGiEnJul";
import AddUser from "./Users/AddUser";
import EventsContainer from "./Events/EventsContainer";
import ManageMunicipalityContainer from "./Municipality/ManageMunicipalityContainer";

interface IManageDashboard {
  role: string;
  location: string;
  accessToken: string;
}

const ManageDashboard: React.FC<IManageDashboard> = ({ accessToken, location, role }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<string>("2");

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Container className={classes.root}>
      <TabContext value={tab}>
        <TabList onChange={handleChange} centered>
          <Tab hidden={role != "SuperAdmin"} label="FAQ" value="1" />
          <Tab label="Kommune Informasjon" value="2" />
          <Tab hidden={role != "SuperAdmin"} label="Bedrift" value="3" />
          <Tab hidden={role != "SuperAdmin"} label="Hvordan starte Gi en jul" value="4" />
          <Tab hidden={role != "SuperAdmin"} label="Legg til/Slett Brukere" value="5" />
          <Tab hidden={role != "SuperAdmin"} label="Administrer Eventer" value="6" />
        </TabList>
        <TabPanel value="1">
          <FaqContainer accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <ManageMunicipalityContainer
            accessToken={accessToken}
            assignedLocation={location}
            role={role}
          />
        </TabPanel>
        <TabPanel value="3">
          <BusinessInformation accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="4">
          <HowToStartGiEnJul accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="5">
          <AddUser accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="6">
          <EventsContainer accessToken={accessToken} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default ManageDashboard;
