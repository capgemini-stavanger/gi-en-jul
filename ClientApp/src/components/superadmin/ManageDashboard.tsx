import { Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/superadmin/Styles";
import React, { useState } from "react";
import { Container } from "reactstrap";
import KommuneContainer from "./kommune/KommuneContainer";

interface IManageDashboard {
  accessToken: string;
}

const ManageDashboard: React.FC<IManageDashboard> = ({ accessToken }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<string>("1");
  const apiservice = new ApiService(accessToken);

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
          <Tab label="Legg til/Slett Brukere" value="3" />
        </TabList>
        <TabPanel value="1">
          <Typography>Placeholder - FAQ</Typography>
        </TabPanel>
        <TabPanel value="2">
          <KommuneContainer accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="3">
          <Typography>Placeholder - Legg til/Slett Brukere</Typography>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default ManageDashboard;
