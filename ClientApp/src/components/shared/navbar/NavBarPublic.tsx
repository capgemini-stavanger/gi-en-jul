import {
  Button,
  IconButton,
  Tab,
  Box,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { isMobile } from "common/functions/IsMobile";
import logo from "styling/img/logo_green.svg";
import useStyles from "components/shared/Styles";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { TabContext, TabList } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";

const NavBarPublic = () => {
  const [tab] = useState<string>("1");
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(() => event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(() => null);
  };

  if (isMobile()) {
    return (
      <>
        <AppBar className={classes.navContainer}>
          <Toolbar className={classes.toolBar}>
            <IconButton className={classes.navIcon} edge="start" onClick={handleEvent}>
              <MenuIcon />
            </IconButton>
            <Drawer open={!!anchorEl} anchor="top" onClose={handleClose}>
              <List className={classes.drawerMenu}>
                <IconButton onClick={handleClose} className={classes.closeButton}>
                  <Close color="primary" />
                </IconButton>
                <ListItem>
                  <Link
                    to="/"
                    onClick={() => {
                      history.push("/");
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography className={classes.drawerContent}>Hjem</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="bedrift"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      history.push("/bedrift");
                    }}
                  >
                    <Typography className={classes.drawerContent}>For bedrifter</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="startJul"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      history.push("/startJul");
                    }}
                  >
                    <Typography className={classes.drawerContent}>
                      Hvordan starte Gi en Jul i din kommune
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="kommune"
                    onClick={() => {
                      history.push("/kommune");
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography className={classes.drawerContent}>Kommuner</Typography>
                  </Link>
                </ListItem>
              </List>
            </Drawer>
            <Button
              size="large"
              endIcon={<ArrowForwardIos />}
              className={classes.buttonNext}
              onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
            >
              Bli giver
            </Button>
          </Toolbar>
        </AppBar>
      </>
    );
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
  } else {
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
