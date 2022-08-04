import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LoadingPage from "pages/LoadingPage";
import useUser from "hooks/useUser";
import ErrorPage from "pages/ErrorPage";
import InstitutionMacro from "pages/institution";
import AdminTab from "pages/administrator";
import { User } from "components/shared/Types";

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
      return (
        <>
          <AdminTab accessToken={userAccessToken} user={user} />
        </>
      );
    case "Admin":
      return (
        <>
          <AdminTab accessToken={userAccessToken} user={user} />
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
