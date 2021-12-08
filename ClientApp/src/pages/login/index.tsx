import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LoadingPage from "pages/LoadingPage";
import NavMenuAdmin from "components/shared/NavBar/NavMenuAdmin";
import useUser from "hooks/useUser";
import ErrorPage from "pages/ErrorPage";
import InstitutionMacro from "pages/institution";
import AdminTab from "components/admin/AdminTab";

function LoginRedirector() {
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

  function getPage() {
    if (location === null) return "NoLocation";
    else if (role === undefined || location === undefined) return "Loading";
    else if (role === "Unspecified") return "Unspecified";
    else if (role === "Admin") return "Admin";
    else if (role === "Institution") return "Institution";
    else return "Error";
  }

  switch (getPage()) {
    case "NoLocation":
      return (
        <ErrorPage
          ErrorText={
            "Du har ikke blitt tildelt en lokasjon enda, tilkall din GiEnJul admin"
          }
        />
      );
    case "Loading":
      return <LoadingPage />;
    case "Unspecified":
      return (
        <ErrorPage
          ErrorText={
            "Du har ikke blitt tildelt en rolle enda, tilkall din GiEnJul admin"
          }
        />
      );
    case "Admin":
      return (
        <>
          <NavMenuAdmin role="Admin"/>
          <AdminTab accessToken={userAccessToken} location={location ?? ""} />
        </>
      );
    case "Institution":
      return (
        <>
          <InstitutionMacro accessToken={userAccessToken} />
        </>
      );
    default:
      return <ErrorPage ErrorText={"En Feil har skjedd"} ErrorCode={500} />;
  }
}

export default withAuthenticationRequired(LoginRedirector, {
  onRedirecting: () => <LoadingPage />,
});
