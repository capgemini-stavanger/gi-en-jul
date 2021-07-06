import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@material-ui/core";
import * as React from "react";
import LoadingPage from "../../common/components/LoadingPage";
import LogOutButton from "../login/LogOutButton";
import AdminMenu from "./common/AdminMenu";
import Completed from "./connections/Completed";
import Suggested from "./connections/Suggested";
import Giver from "./overview/Giver";

function AdminPage() {
  return (
    <>
      <LogOutButton></LogOutButton>
      <Container maxWidth="xl">
        <AdminMenu />
        <Suggested />
        <Completed />
        <Giver/>
      </Container>
    </>
  );
}

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <LoadingPage />,
});
