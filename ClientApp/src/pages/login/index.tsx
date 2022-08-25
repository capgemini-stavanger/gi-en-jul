import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LoadingPage from "pages/LoadingPage";
import useUser from "hooks/useUser";
import ErrorPage from "pages/ErrorPage";
import InstitutionMacro from "pages/institution";
import AdminTab from "pages/administrator";
import { User } from "components/shared/Types";
import accessTokenContext from "contexts/accessTokenContext";

function LoginRedirector() {
  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const user: User = useUser();

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
    else if (user.role === undefined || location === undefined) return "Loading";
    else if (user.role === "Unspecified") return "Unspecified";
    else if (user.role === "Admin") return "Admin";
    else if (user.role === "Institution") return "Institution";
    else if (user.role === "SuperAdmin") return "SuperAdmin";
    else return "Error";
  }

  switch (getPage()) {
    case "NoLocation":
      return (
        <ErrorPage
          ErrorText={"Du har ikke blitt tildelt en lokasjon enda, tilkall din GiEnJul admin"}
        />
      );
    case "Loading":
      return <LoadingPage />;
    case "Unspecified":
      return (
        <ErrorPage
          ErrorText={"Du har ikke blitt tildelt en rolle enda, tilkall din GiEnJul admin"}
        />
      );
    case "SuperAdmin":
    case "Admin":
      return (
        <accessTokenContext.Provider value={userAccessToken}>
          <AdminTab user={user} />
        </accessTokenContext.Provider>
      );
    case "Institution":
      return (
        <accessTokenContext.Provider value={userAccessToken}>
          <InstitutionMacro />
        </accessTokenContext.Provider>
      );
    default:
      return <ErrorPage ErrorText={"En Feil har skjedd"} ErrorCode={500} />;
  }
}

export default withAuthenticationRequired(LoginRedirector, {
  onRedirecting: () => <LoadingPage />,
});
