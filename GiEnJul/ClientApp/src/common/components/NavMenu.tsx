import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Link as Scroll } from "react-scroll";
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        if (window.location.pathname === "/bli-giver") {
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Gi en jul</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem className="nav-link pointer">
                                        <NavLink onClick={this.toggle} tag={Link} className="text-dark" to="/">Hjem</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            )
        }
        else {
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Gi en jul</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem className="nav-link pointer">
                                        <Scroll onClick={this.toggle} to='how' spy={true} smooth={true}>Hvordan</Scroll>
                                    </NavItem>
                                    <NavItem className="nav-link pointer">
                                        <Scroll onClick={this.toggle} to='questions' spy={true} smooth={true}>Spørsmål</Scroll>
                                    </NavItem>
                                    <NavItem className="nav-link pointer">
                                        <Scroll onClick={this.toggle} to='companies' spy={true} smooth={true}>For bedrift</Scroll>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            );
        }
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
