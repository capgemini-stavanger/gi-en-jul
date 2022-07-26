import { Button, IconButton, Tab, Box, Grid, Toolbar, AppBar } from "@material-ui/core";
import { isMobile } from "common/functions/IsMobile";
import logo from "styling/img/logo_white.svg";
import logogreen from "styling/img/logo_green.svg";
import useStyles from "components/shared/Styles";
import { ArrowForwardIos, FiberManualRecord } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import NavbarMobile from "./NavBarMobile";
import React from "react";

const NavBarPublic = () => {
  const classes = useStyles();
  const history = useHistory();

  if (isMobile()) {
    return <NavbarMobile />;
  } else if (window.location.pathname === "/bli-giver") {
    return (
      <>
        <AppBar className={classes.navContainer}>
          <Toolbar className={classes.toolBar}>
            <IconButton className={classes.logoBliGiverContainer}>
              <Link to="/">
                <FiberManualRecord className={classes.treeCircleBliGiver} />
                <img className={classes.smallLogoBliGiver} src={logogreen}></img>
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
    );
  } else {
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
              {window.location.pathname == "/bedrift" ? (
                <Button
                  size="large"
                  className={classes.giverButton}
                  style={{ visibility: "hidden" }}
                  endIcon={<ArrowForwardIos />}
                  onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
                >
                  Bli giver
                </Button>
              ) : (
                <Button
                  size="large"
                  className={classes.giverButton}
                  endIcon={<ArrowForwardIos />}
                  onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
                >
                  Bli giver
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
};
export default NavBarPublic;
