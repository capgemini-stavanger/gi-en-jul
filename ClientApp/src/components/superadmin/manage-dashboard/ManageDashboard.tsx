import { Button, Typography } from "@material-ui/core";
import useStyles from "components/superadmin/Styles";
import React from "react";
import { Container } from "reactstrap";

function ManageDashboard() {
  const classes = useStyles();

  function handleClick() {
    alert("You clicked the button!");
  }
  return (
    <Container className={classes.root}>
      <Typography className={classes.heading} variant="h3">
        ManageDashboard
      </Typography>
      <Button onClick={handleClick} variant="contained">
        BIG BUTTON{" "}
      </Button>
    </Container>
  );
}

export default ManageDashboard;
