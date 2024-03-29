import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import LogOutButton from "components/login/LogOutButton";
import logo from "styling/img/logo_green.svg";
import "components/shared/navbar/NavBarLoggedIn.css";
import NavBarPublic from "components/shared/navbar/NavBarPublic";

export default class NavBarLoggedIn extends React.PureComponent<
  { role?: string },
  { isOpen: boolean }
> {
  public state = {
    isOpen: false,
  };

  public render() {
    if (this.props.role == "Institution" || this.props.role == "Admin") {
      return (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img className={"logo-small"} src={logo}></img>
            </NavbarBrand>
            <LogOutButton />
          </Container>
        </Navbar>
      );
    } else {
      return <NavBarPublic />;
    }
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
}
