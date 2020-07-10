import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';

import './AppNavbar.css';
import Logout from '../../common/logout/Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    toggle = () => {
        this.setState(prevState => {
            return {
                isOpen: !this.state.isOpen
            };
        });
    }

    render() {
        const { isAuthenticated } = this.props;

        const dashboardLink = isAuthenticated && (
            <Fragment>
                <NavItem>
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </NavItem>
            </Fragment>
        );

        const logoutLink = isAuthenticated && (
            <Fragment>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const gustLink = !isAuthenticated && (
            <Fragment>
                <NavItem>
                    <NavLink className="nav-link" to="/sign-up">Sign Up</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/login">Sign In</NavLink>
                </NavItem>
            </Fragment>
        );

        return (
            <Navbar dark expand="sm" className="Navbar mb-5">
                <Container>
                    <NavbarBrand href="/login">Laravel</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <Fragment>
                                {gustLink}
                            </Fragment>
                            <Fragment>
                                {dashboardLink}
                            </Fragment>
                        </Nav>
                        <Nav navbar className="ml-auto">
                            <Fragment>
                                {logoutLink}
                            </Fragment>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(AppNavbar);
