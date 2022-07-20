import { AppBar, Button, Drawer, IconButton, List, ListItem, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
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
        <AppBar className={classes.navContainerMobile}>
          <Toolbar className={classes.toolBar}>
            <IconButton className={classes.navIcon} edge="start" onClick={handleEvent}>
              <MenuIcon />
            </IconButton>
            <Drawer open={!!anchorEl} anchor="top" onClose={handleClose}>
              <List className={classes.drawerMenu}>
                <IconButton onClick={handleClose} className={classes.closeButton}>
                  <Close color="primary" />
                </IconButton>
                <ListItem
                  onClick={() => {
                    history.push("kommune");
                  }}
                  className={classes.drawerContent}
                >
                  Kommune innformasjon
                </ListItem>
                <ListItem
                  onClick={() => {
                    history.push("/startJul");
                  }}
                  className={classes.drawerContent}
                >
                  Start Gi en jul i din kommune
                </ListItem>
                <ListItem
                  onClick={() => {
                    history.push("/bedrift");
                  }}
                  className={classes.drawerContent}
                >
                  For bedrifter
                </ListItem>
              </List>
            </Drawer>
            <Button
              disabled={true}
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
  } else {
    return (
      <>
        <AppBar className={classes.navContainerMobile}>
          <Toolbar className={classes.toolBar}>
            <IconButton className={classes.navIcon} edge="start" onClick={handleEvent}>
              <MenuIcon />
            </IconButton>
            <Drawer open={!!anchorEl} anchor="top" onClose={handleClose}>
              <List className={classes.drawerMenu}>
                <IconButton onClick={handleClose} className={classes.closeButton}>
                  <Close color="primary" />
                </IconButton>
                <ListItem
                  onClick={() => {
                    history.push("/");
                  }}
                  className={classes.drawerContent}
                >
                  Hjem
                </ListItem>
                <ListItem
                  onClick={() => {
                    history.push("kommune");
                  }}
                  className={classes.drawerContent}
                >
                  Kommune innformasjon
                </ListItem>
                <ListItem
                  onClick={() => {
                    history.push("/startJul");
                  }}
                  className={classes.drawerContent}
                >
                  Start Gi en jul i din kommune
                </ListItem>
                <ListItem
                  onClick={() => {
                    history.push("/bedrift");
                  }}
                  className={classes.drawerContent}
                >
                  For bedrifter
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
