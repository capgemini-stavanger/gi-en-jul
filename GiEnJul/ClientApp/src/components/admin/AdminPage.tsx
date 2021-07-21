import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Grid, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import LogOutButton from "../login/LogOutButton";
import Completed from "./connections/Completed";
import Giver from "./overview/Giver";
import Recipient from "./overview/Recipient";

function AdminPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const [step, setStep] = useState<string>("1");

  async function getUserAccessToken(): Promise<string> {
    const accessToken = await getAccessTokenSilently();
    return accessToken;
  }
  useEffect(() => {
    getUserAccessToken().then((resp: string) => {
      setUserAccessToken(resp);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setStep(newValue);
  };
  if (userAccessToken !== "") {
    return (
      <>
        <LogOutButton />
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
              justifyContent="center"
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
  } else {
    return <LoadingPage />;
  }
}
export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
