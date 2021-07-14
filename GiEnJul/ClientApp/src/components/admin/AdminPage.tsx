import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Grid, Tab, Typography } from "@material-ui/core";
import { TabContext, TabPanel, TabList } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import InstitutionMacro from "../institution/InstitutionMacro";
import LogOutButton from "../login/LogOutButton";
import Completed from "./connections/Completed";
import Giver from "./overview/Giver";
import Recipient from "./overview/Recipient";

type UserDataType = {
  app_metadata?: { role: string };
  email?: string;
  email_verified?: boolean;
  identities?: [{}];
  last_ip?: number;
  last_login?: string;
  logins_count?: number;
  name?: string;
  nickname?: string;
  picture?: string;
  updated_at?: string;
  user_metadata?: { string: string };
};

function AdminPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState<UserDataType | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [step, setStep] = useState<string>("1");

  async function getUserInformation(): Promise<UserDataType> {
    const domain = process.env.REACT_APP_DEV_TENANT_AUTH0!;

    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    });

    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user!.sub}`;

    const response = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInformation: UserDataType = await response.json();
    return userInformation;
  }
  useEffect(() => {
    getUserInformation().then((response: UserDataType) => {
      setUserData(response);
      setIsLoaded(true);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setStep(newValue);
  };

  if (!isLoaded) {
    return <LoadingPage />;
  } else if (isLoaded && userData == null) {
    throw new Error("userData was not Loaded");
  } else {
    if (userData!.app_metadata!.role === "institution") {
      return <InstitutionMacro />;
    } else if (userData!.app_metadata!.role === "admin") {
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
      return (
        <ErrorPage
          ErrorText={"Your Role has not yet been set"}
          ErrorCode={200}
        />
      );
    }
  }
}
export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
