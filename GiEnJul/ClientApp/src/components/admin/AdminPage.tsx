import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Grid, Tab,Typography } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from "@material-ui/lab/TabList";

import * as React from "react";
import { useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import LogOutButton from "../login/LogOutButton";
import Completed from "./connections/Completed";
import Giver from "./overview/Giver";
import Recipient from "./overview/Recipient";

function AdminPage() {
  const [step, setStep] = useState<string>("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setStep(newValue);
  };
  return (
    <>
      <LogOutButton></LogOutButton>
      <TabContext value={step}>
        <TabList onChange={handleChange} centered>
          <Tab label="Oversikt" value="1" />
          <Tab label="Foreslåtte koblinger" value="2" />
          <Tab label="Fullførte koblinger" value="3" />
        </TabList>
        <TabPanel value="1">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={6}>
              <Typography variant="h4" align="center">
                Givere
              </Typography>
              <Giver />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" align="center">
                Familier
              </Typography>
              <Recipient />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3">
          <Completed />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
