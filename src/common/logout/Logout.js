import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    NavLink
} from 'reactstrap';

import { logoutUser } from '../../actions/authActions';

class Logout extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };

    onHandleLogout = e => {
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.onHandleLogout} href="#!">Logout</NavLink>
            </Fragment>
        )
    }
}

export default withRouter(connect(null, { logoutUser })(Logout));
