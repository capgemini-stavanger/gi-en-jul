import { Button, IconButton, Tab, Box, Grid, Toolbar, AppBar } from "@material-ui/core";
import { isMobile } from "common/functions/IsMobile";
import logo from "styling/img/logo_green.svg";
import useStyles from "components/shared/Styles";
import { ArrowForwardIos } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { TabContext, TabList } from "@material-ui/lab";
import NavBarBusiness from "./NavBarBusiness";
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
            <IconButton>
              <Link to="/">
                <img className={classes.smallLogo} src={logo}></img>
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
    );
  } else if (window.location.pathname == "/bedrift") {
    return <NavBarBusiness />;
  } else {
    return (
      <>
        <Box className={classes.navbarBackground}>
          <Navbar className={classes.navContainer}>
            <NavbarBrand className={classes.toolBar}>
              <TabContext value={"1"}>
                <TabList centered className={classes.toolBar}>
                  <Grid container justifyContent="center" direction="row" spacing={10}>
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          history.push("/");
                        }}
                      >
                        <img className={classes.smallLogo} src={logo}></img>
                      </IconButton>
                    </Grid>

                    <Grid item>
                      <Tab
                        onClick={() => {
                          history.push("/");
                        }}
                        className={classes.drawerContent}
                        label="Hjem"
                      ></Tab>
                    </Grid>

                    <Grid item>
                      <Tab
                        onClick={() => {
                          history.push("/bedrift");
                        }}
                        className={classes.drawerContent}
                        label="For bedrifter"
                      ></Tab>
                    </Grid>

                    <Grid item>
                      <Tab
                        onClick={() => {
                          history.push("/startJul");
                        }}
                        className={classes.drawerContent}
                        label="Start Gi en jul i din kommune"
                      ></Tab>
                    </Grid>
                    <Grid item>
                      <Tab
                        onClick={() => {
                          history.push("kommune");
                        }}
                        className={classes.drawerContent}
                        label="Kommuner"
                      ></Tab>
                    </Grid>
                  </Grid>
                </TabList>
              </TabContext>
            </NavbarBrand>
          </Navbar>
          <Grid item>
            <Box alignItems={"right"}>
              <Button
                size="large"
                className={classes.giverButton}
                endIcon={<ArrowForwardIos />}
                onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
              >
                Bli giver
              </Button>
            </Box>
          </Grid>
        </Box>
      </>
    );
  }
};
export default NavBarPublic;
