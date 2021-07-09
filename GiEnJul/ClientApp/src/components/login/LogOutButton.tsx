import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import React from "react";

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
