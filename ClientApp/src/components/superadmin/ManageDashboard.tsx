import { Grid, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import useStyles from "components/superadmin/Styles";
import React, { useState } from "react";
import { Container } from "reactstrap";
import BusinessInformation from "./Business/BusinessInformation";
import FaqContainer from "./Faq/FaqContainer";
import MunicipalityInformationContainer from "./MunicipalityInformation/MunicipalityInformationContainer";
import HowToStartGiEnJul from "./InfoPages/HowToStartGiEnJul";
import AdminMunicipalityUserEvent from "./MuniEventUserManaging/AdminMunicipalityUserEvent";
import MunicipalityContainer from "./Municipality/MunicipalityContainer";
import AddUser from "./Users/AddUser";

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
          <Tab hidden={role != "SuperAdmin"} label="Legg til Kommuner og Eventer" value="6" />
        </TabList>
        <TabPanel value="1">
          <FaqContainer accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <MunicipalityInformationContainer
            accessToken={accessToken}
            role={role}
            assignedLocation={location}
          />
        </TabPanel>
        <TabPanel value="3">
          <BusinessInformation accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="4">
          <HowToStartGiEnJul accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="5">
          <Grid item>
            <AddUser accessToken={accessToken} />
          </Grid>
        </TabPanel>
        <TabPanel value="6">
          <AdminMunicipalityUserEvent accessToken={accessToken} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default ManageDashboard;
