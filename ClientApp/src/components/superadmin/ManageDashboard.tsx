import { Button, Tab, Typography } from "@material-ui/core";
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

  function handleClick() {
    alert("You clicked the button!");
  }

  const options = ["FAQ", "Kommune Informasjon", "Slett Brukere", "Legg til Bruker"];
  const tabList = options.map((option, index) => {
    return <Tab key={index} label={option} value={String(index + 1)} />;
  });

  const activeLocations = ["Stavanger", "Sola", "Sandnes", "Gjesdal"];

  return (
    <Container className={classes.root}>
      <Typography className={classes.heading} align="center" variant="h1">
        ManageDashboard
      </Typography>
      <TabContext value={step}>
        <TabList onChange={handleChange} centered>
          {tabList}
        </TabList>
        <TabPanel value="1">
          {/* todo: component for changing the FAQ values */}
          <Typography>component for changing the FAQ values </Typography>
        </TabPanel>
        <TabPanel value="2">
          {/* todo: component for changing the Kommune Information values */}
          <Typography>component for changing the Kommune Information values </Typography>
        </TabPanel>
        <TabPanel value="3">
          {/* todo: component for deleting existing users */}
          <Typography>component for deleting existing users </Typography>
        </TabPanel>
        <TabPanel value="4">
          {/* todo: component for adding new users */}
          <Typography>component for adding new users </Typography>
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default ManageDashboard;
