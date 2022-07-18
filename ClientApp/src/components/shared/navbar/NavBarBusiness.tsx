import { Box, Grid, IconButton, Tab } from "@material-ui/core";
import { TabContext, TabList } from "@material-ui/lab";
import useStyles from "components/shared/Styles";
import { useState } from "react";
import { useHistory } from "react-router";
import { Navbar, NavbarBrand } from "reactstrap";
import logo from "styling/img/logo_green.svg";

const NavBarBusiness = () => {
  const classes = useStyles();
  const [tab] = useState<string>("1");
  const history = useHistory();

  return (
    <>
      <Box className={classes.navbarBackground}>
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
      </Box>
    </>
  );
};

export default NavBarBusiness;
