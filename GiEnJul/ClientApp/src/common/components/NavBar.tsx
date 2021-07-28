import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import logo from "./../../styling/img/logo_gronn.svg";
import useStyles from "./Styles";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos, Close } from "@material-ui/icons";

const NavBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(() => event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(() => null);
  };

  if (window.location.pathname === "/bli-giver") {
    return (
      <>
        <AppBar className={classes.navContainer}>
          <Toolbar className={classes.toolBar}>
            <IconButton >
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
        <AppBar className={classes.navContainer}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              className={classes.navIcon}
              edge="start"
              onClick={handleEvent}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={!!anchorEl} anchor="top" onClose={handleClose}>
              <List className={classes.drawerMenu}>
                <Close className={classes.closeButton} onClick={handleClose} />
                <ListItem>
                  <Scroll onClick={handleClose} to="how" smooth={true}>
                    Hvordan fungerer gi en jul?
                  </Scroll>
                </ListItem>
                <ListItem>
                  <Scroll onClick={handleClose} to="questions" smooth={true}>
                    Ofte stilte spørsmål
                  </Scroll>
                </ListItem>
                <ListItem>
                  <Scroll onClick={handleClose} to="companies" smooth={true}>
                    For bedrifter
                  </Scroll>
                </ListItem>
                <ListItem>
                  <Scroll onClick={handleClose} to="contact" smooth={true}>
                    Kontakt
                  </Scroll>
                </ListItem>
              </List>
            </Drawer>
            <Link to="/bli-giver">
              <Button
                size="large"
                endIcon={<ArrowForwardIos />}
                className={classes.buttonNext}
              >
                Bli giver
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </>
    );
  }
};
export default NavBar;
