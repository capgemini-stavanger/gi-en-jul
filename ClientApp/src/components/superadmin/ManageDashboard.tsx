import { Grid, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import useStyles from "components/superadmin/Styles";
import React, { useState } from "react";
import { Container } from "reactstrap";
import BusinessInformation from "./Business/BusinessInformation";
import FaqContainer from "./Faq/FaqContainer";
import EventsContainer from "./Events/EventsContainer";
import KommuneContainer from "./kommune/KommuneContainer";

interface IManageDashboard {
  accessToken: string;
}

const ManageDashboard: React.FC<IManageDashboard> = ({ accessToken }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<string>("1");

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.heading} align="center" variant="h3">
        ManageDashboard
      </Typography>
      <TabContext value={tab}>
        <TabList onChange={handleChange} centered>
          <Tab label="FAQ" value="1" />
          <Tab label="Kommune Informasjon" value="2" />
          <Tab label="Bedrift" value="3" />
          <Tab label="Legg til/Slett Brukere" value="4" />
          <Tab label="Administrer Kommuner og Eventer" value="5" />
        </TabList>
        <TabPanel value="1">
          <FaqContainer accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <KommuneContainer accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="3">
          <BusinessInformation accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="4">
          <Typography>Placeholder - Legg til/Slett Brukere</Typography>
        </TabPanel>
        <TabPanel value="5">
          <Grid container direction="column">
            <Grid item>municipality managing placeholder</Grid>
            <Grid item>
              <EventsContainer accessToken={accessToken} />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default ManageDashboard;
