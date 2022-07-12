import { Button, IconButton, Tab, Box, Grid } from "@material-ui/core";
import React, { useState } from "react";

import logo from "styling/img/logo_green.svg";
import useStyles from "components/shared/Styles";

import { ArrowForwardIos } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { TabContext, TabList } from "@material-ui/lab";

const NavBarPublic = () => {
  const [tab] = useState<string>("1");
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Navbar className={classes.navContainer}>
        <NavbarBrand className={classes.toolBar}>
          <TabContext value={tab}>
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
    </>
  );
};
export default NavBarPublic;
