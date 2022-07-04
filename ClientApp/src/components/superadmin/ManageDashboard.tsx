import { Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import useStyles from "components/superadmin/Styles";
import React, { useState } from "react";
import { Container } from "reactstrap";

function ManageDashboard() {
  const classes = useStyles();
  const [step, setStep] = useState<string>("1");

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setStep(newValue);
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.heading} align="center" variant="h3">
        ManageDashboard
      </Typography>
      <TabContext value={step}>
        <TabList onChange={handleChange} centered>
          <Tab label="FAQ" value="1" />
          <Tab label="Kommune Informasjon" value="2" />
          <Tab label="Legg til/Slett Brukere" value="3" />
        </TabList>
        <TabPanel value="1">
          <Typography>Placeholder - FAQ</Typography>
        </TabPanel>
        <TabPanel value="2">
          <Typography>Placeholder - Kommune Informasjon</Typography>
        </TabPanel>
        <TabPanel value="3">
          <Typography>Placeholder - Legg til/Slett Brukere</Typography>
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default ManageDashboard;
