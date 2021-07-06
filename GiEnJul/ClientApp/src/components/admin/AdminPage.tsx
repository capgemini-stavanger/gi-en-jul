import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@material-ui/core";
import * as React from "react";
import LoadingPage from "../../common/components/LoadingPage";
import LoginButton from "../login/LoginButton";
import LogOutButton from "../login/LogOutButton";
import AdminMenu from "./common/AdminMenu";
import Completed from "./connections/Completed";
import Suggested from "./connections/Suggested";

function AdminPage() {
  return (
    <>
      <LoginButton></LoginButton>
      <LogOutButton></LogOutButton>
      <Container maxWidth="xl">
        <AdminMenu />
        <Suggested />
        <Completed />
      </Container>
    </>
  );
}

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
