import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import logo from "./../../styling/img/logo_gronn.svg";
import useStyles from "./Styles";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos } from "@material-ui/icons";

const NavBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(() => event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(() => null);
  };
  const open = Boolean(anchorEl);

  if (window.location.pathname === "/bli-giver") {
    return (
      <>
        <AppBar className={classes.navContainer} >
          <Toolbar>
            <Link to="/">
              <IconButton edge="start" >
                <img className={classes.smallLogo} src={logo}></img>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </>
    );
  } else {
    return (
      <>
        <AppBar className={classes.navContainer} >
          <Toolbar className= {classes.toolBar}>
            <IconButton
              className={classes.navIcon}
              edge='start'
              onClick={handleEvent}
            >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuList>
                <MenuItem>
                  <Scroll onClick={handleClose} to="how" smooth={true}>
                    Hvordan fungerer gi en jul?
                  </Scroll>
                </MenuItem>
                <MenuItem>
                  <Scroll onClick={handleClose} to="questions" smooth={true}>
                    Ofte stilte spørsmål
                  </Scroll>
                </MenuItem>
                <MenuItem>
                  <Scroll onClick={handleClose} to="companies" smooth={true}>
                    For Bedrifter
                  </Scroll>
                </MenuItem>
                <MenuItem>
                  <Scroll onClick={handleClose} to="contact" smooth={true}>
                    Kontakt
                  </Scroll>
                </MenuItem>
              </MenuList>
            </Menu>
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
