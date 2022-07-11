import {
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  Typography,
  Tab,
  Box,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import logo from "styling/img/logo_green.svg";
import useStyles from "components/shared/Styles";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { TabContext, TabList } from "@material-ui/lab";

const NavBarPublic = () => {
  const [tab, setTab] = useState<string>("1");
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  if (window.location.pathname === "/bli-giver") {
    return (
      <>
        <Navbar className={classes.navContainer}>
          <Toolbar className={classes.toolBar}>
            <IconButton>
              <Link to="/">
                <img className={classes.smallLogo} src={logo}></img>
              </Link>
            </IconButton>
          </Toolbar>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar className={classes.navContainer}>
          <NavbarBrand className={classes.toolBar}>
            <TabContext value={tab}>
              <div>
                <TabList onChange={handleChange} centered className={classes.toolBar}>
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
                    value="2"
                  ></Tab>

                  <Tab
                    onClick={() => {
                      history.push("/startJul");
                    }}
                    className={classes.drawerContent}
                    label="Start Gi en jul i din kommune"
                    value="3"
                  ></Tab>

                  <Tab
                    onClick={() => {
                      history.push("kommune");
                    }}
                    className={classes.drawerContent}
                    label="Kommuner"
                  ></Tab>
                </TabList>
              </div>
            </TabContext>
          </NavbarBrand>
        </Navbar>
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
      </>
    );
  }
};
export default NavBarPublic;
