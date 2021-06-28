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
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Gi en jul</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {/* <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Hjem</NavLink>
                                </NavItem> */}
                                
                                <NavItem>
                                    <NavLink>
                                    <Scroll to='how' spy={true} smooth={true}>Hvordan</Scroll>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                    <Scroll to='questions' spy={true} smooth={true}>Spørsmål</Scroll>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                    <Scroll to='companies' spy={true} smooth={true}>For bedrift</Scroll>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/registrer-familie">Registrer familie</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                    
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
