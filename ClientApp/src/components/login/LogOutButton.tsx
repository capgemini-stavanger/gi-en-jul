import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import React from "react";

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <IconButton
      edge="start"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      <ExitToApp color="primary" />
      <Typography>Logg ut</Typography>
    </IconButton>
  );
};

export default LogOutButton;
