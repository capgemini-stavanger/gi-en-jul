import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, Typography } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import InstitutionMacro from "../institution/InstitutionMacro";
import LogOutButton from "../login/LogOutButton";
import AdminMenu from "./common/AdminMenu";
import Completed from "./connections/Completed";
import Suggested from "./connections/Suggested";
import Giver from "./overview/Giver";

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
          <Container maxWidth="xl">
            <AdminMenu />
            <Suggested />
            <Completed />
            <Typography variant='h4'>
              Givere
            </Typography>
            <Giver/>
          </Container>
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