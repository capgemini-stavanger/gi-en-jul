import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import * as React from "react";
import { useEffect, useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import NavMenuAdmin from "../../common/components/NavMenuAdmin";
import useUser from "../../hooks/useUser";
import ErrorPage from "../common/ErrorPage";
import InstitutionMacro from "../institution/InstitutionMacro";
import AdminTab from "./AdminTab";

function AdminPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const { location, role } = useUser();

  async function getUserAccessToken(): Promise<string> {
    const accessToken = await getAccessTokenSilently();
    return accessToken;
  }

  useEffect(() => {
    getUserAccessToken().then((resp: string) => {
      setUserAccessToken(resp);
    });
  }, []);

  if (location === null) {
    return (
      <ErrorPage
        ErrorText={
          "Du har ikke blitt tildelt en lokasjon enda, tilkall din GiEnJul admin"
        }
      />
    );
  } else if (role !== undefined && location !== undefined) {
    console.log(role);
    switch (role) {
      case "Admin":
        return (
          <>
            <NavMenuAdmin />
            <AdminTab accessToken={userAccessToken} location={location} />
          </>
        );
      case "Institution":
        return (
          <>
            <InstitutionMacro />
          </>
        );

      case "Unspecified":
        return (
          <ErrorPage
            ErrorText={
              "Du har ikke blitt tildelt en rolle enda, tilkall din GiEnJul admin"
            }
          />
        );
      default:
        return <ErrorPage ErrorText={"En Feil har skjedd"} ErrorCode={500} />;
    }
  } else {
    console.log(role, location);

    return <LoadingPage />;
  }
}
export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
