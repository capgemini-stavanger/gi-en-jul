import { Box, Button, Grid, IconButton, Tab } from "@material-ui/core";
import { ArrowForwardIos, FiberManualRecord } from "@material-ui/icons";
import useStyles from "components/shared/Styles";
import React from "react";
import { useHistory } from "react-router";
import logo from "styling/img/logo_white.svg";

const NavBarBusiness = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box>
        <Grid
          container
          className={classes.navBarGridContainer}
          justifyContent="space-around"
          alignItems="center"
          direction="row"
        >
          <Grid item className={classes.treeGridIcon}>
            <IconButton
              onClick={() => {
                history.push("/");
              }}
            >
              <FiberManualRecord className={classes.treeCircle} />
              <img className={classes.smallLogo} src={logo}></img>
            </IconButton>
          </Grid>

          <Grid item className={classes.fontSizeNavText}>
            <Tab
              onClick={() => {
                history.push("/");
              }}
              className={classes.drawerContent}
              label="Hjem"
            ></Tab>

            <Tab
              onClick={() => {
                history.push("/bedrift");
              }}
              className={classes.drawerContent}
              label="For bedrifter"
            ></Tab>

            <Tab
              onClick={() => {
                history.push("/startJul");
              }}
              className={classes.drawerContent}
              label="Start Gi en jul i din kommune"
            ></Tab>

            <Tab
              onClick={() => {
                history.push("kommune");
              }}
              className={classes.drawerContent}
              label="Kommuner"
            ></Tab>
          </Grid>
          <Grid item className={classes.giverButtonGridItem}>
            <Button
              disabled={true}
              size="large"
              className={classes.giverButton}
              endIcon={<ArrowForwardIos />}
              onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
            >
              Bli giver
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NavBarBusiness;
