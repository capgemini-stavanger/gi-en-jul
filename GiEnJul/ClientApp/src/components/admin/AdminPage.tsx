import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import * as React from "react";
import { useEffect, useState } from "react";
import LoadingPage from "../../common/components/LoadingPage";
import NavMenuAdmin from "../../common/components/NavMenuAdmin";
import LogOutButton from "../login/LogOutButton";
import AdminTab from "./AdminTab";

function AdminPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");

  async function getUserAccessToken(): Promise<string> {
    const accessToken = await getAccessTokenSilently();
    return accessToken;
  }

  useEffect(() => {
    getUserAccessToken().then((resp: string) => {
      setUserAccessToken(resp);
    });
  }, []);

  if (userAccessToken !== "") {
    return (
      <>
        <NavMenuAdmin />
        <LogOutButton />
        <AdminTab accessToken={userAccessToken} />
      </>
    );
  } else {
    return <LoadingPage />;
  }
}
export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
