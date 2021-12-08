import * as React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import LogOutButton from "components/login/LogOutButton";
import logo from "styling/img/logo_green.svg";
import "./NavMenuAdmin.css";

export default class NavMenuAdmin extends React.PureComponent<
  { role?: string },
  { isOpen: boolean }
> {
  public state = {
    isOpen: false,
  };

  public render() {
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
    } 
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
}
