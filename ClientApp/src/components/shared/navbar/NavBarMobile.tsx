import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import React from "react";
import useStyles from "components/shared/Styles";

const NavbarMobile = () => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(() => event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  if (window.location.pathname == "/bedrift") {
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
          </Toolbar>
        </AppBar>
      </>
    );
  } else {
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
  }
};

export default NavbarMobile;
