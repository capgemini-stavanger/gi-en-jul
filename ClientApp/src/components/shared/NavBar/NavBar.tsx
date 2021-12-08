import React,{ FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import LogOutButton from "components/login/LogOutButton";
import logo from "styling/img/logo_green.svg";
import "components/shared/navbar/NavBar.css";
import {  AppBar,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { Link as Scroll } from "react-scroll";
import useStyles from "components/shared/Styles";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default class NavBar extends React.PureComponent<{ role?: string }, { isOpen: boolean }> {
  public state = {
    isOpen: false,
  };

  public render() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const history = useHistory();

  const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(() => event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(() => null);
  };

    if (this.props.role == "Institution" || this.props.role == "Admin") {
      return (
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img className={"logo-small"} src={logo}></img>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <LogOutButton />
          </Container>
        </Navbar>
      );
    } else if (window.location.pathname === "/bli-giver") {
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
                  <IconButton
                  onClick={handleClose}
                  className={classes.closeButton}>
                  <Close color="primary"/>
                  </IconButton>
                  <ListItem >
                    <Scroll onClick={handleClose} to="how" smooth={true}>
                      <Typography className={classes.drawerContent}>Hvordan fungerer gi en jul?</Typography>
                    </Scroll>
                  </ListItem>
                  <ListItem>
                    <Scroll onClick={handleClose} to="questions" smooth={true}>
                    <Typography className={classes.drawerContent}>Ofte stilte spørsmål</Typography>
                    </Scroll>
                  </ListItem >
                  <ListItem>
                    <Scroll onClick={handleClose} to="companies" smooth={true}>
                    <Typography className={classes.drawerContent}>For bedrifter</Typography>
                    </Scroll>
                  </ListItem>
                  <ListItem >
                    <Scroll onClick={handleClose} to="contact" smooth={true}>
                    <Typography className={classes.drawerContent}>Kontakt</Typography>
                    </Scroll>
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
    
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
}
