import { AppBar, Button, Drawer, IconButton, List, ListItem, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos, Close, FiberManualRecord } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import React from "react";
import useStyles from "components/shared/Styles";
import logogreen from "styling/img/logo_green.svg";

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

  if (window.location.pathname === "/bli-giver") {
    return (
      <>
        <AppBar className={classes.navContainer}>
          <Toolbar className={classes.toolBar}>
            <IconButton style={{ marginTop: "20px" }} className={classes.logoBliGiverContainer}>
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
          </Toolbar>
        </AppBar>
      </>
    );
  }
};

export default NavbarMobile;
