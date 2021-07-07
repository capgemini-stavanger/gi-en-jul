import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import InstitutionMacro from "../institution/InstitutionMacro";
import LogOutButton from "../login/LogOutButton";
import AdminMenu from "./common/AdminMenu";
import Completed from "./connections/Completed";
import Suggested from "./connections/Suggested";

function AdminPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [appMetadata, setappMetadata] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getappMetadata = async () => {
      const domain = "dev-r7fmessb.eu.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${
          user!.sub
        }`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user_appMetadata = await metadataResponse.json();
        const userMETA = user_appMetadata.app_metadata;
        setappMetadata(userMETA);
        setIsLoaded(true);
      } catch (e) {
        console.log(e.message);
        setIsLoaded(true);
      }
    };

    getappMetadata();
  }, [user, getAccessTokenSilently]);

  if (!isLoaded) {
    return <LoadingPage />;
  } else if (isLoaded && appMetadata == null) {
    return <LoadingPage />;
  } else {
    if (appMetadata!["role"] === "institution") {
      return <InstitutionMacro />;
    } else if (appMetadata!["role"] === "admin") {
      return (
        <>
          <LogOutButton></LogOutButton>
          <Container maxWidth="xl">
            <AdminMenu />
            <Suggested />
            <Completed />
          </Container>
        </>
      );
    } else {
      return <LoadingPage />;
    }
  }
}

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
