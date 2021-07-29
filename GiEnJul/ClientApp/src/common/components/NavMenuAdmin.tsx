import * as React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import LogOutButton from "../../components/login/LogOutButton";
import logo from "./../../styling/img/logo_green.svg";
import "./NavMenuAdmin.css";

export default class NavMenuAdmin extends React.PureComponent<
  { role?: string },
  { isOpen: boolean }
> {
  public state = {
    isOpen: false,
  };

  public render() {
    if (this.props.role == "Institution") {
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
    } else {
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
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={this.state.isOpen}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/admin">
                    Admin
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/registrer-familie"
                  >
                    Registrer familie
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/rediger">
                    Rediger nettside
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
            <LogOutButton />
          </Container>
        </Navbar>
      );
    }
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
}
