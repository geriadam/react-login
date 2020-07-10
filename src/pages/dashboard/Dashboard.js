import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Jumbotron
} from 'reactstrap';

import './Dashboard.css';

const Dashboard = ({ isAuthenticated, user }) => {
    return (
        <div className="Dashboard">
            <Container>
                <Jumbotron className="Dashboard-Main text-light text-left">
                {isAuthenticated === true ? (
                    <Fragment>
                        <br />
                        <h1 className="dashboard-text display-4">
                            Your email is : {user.email}
                        </h1>
                        <h1 className="dashboard-text display-4">
                            Your preferred color is : {user.color}
                        </h1>
                    </Fragment>
                    ) : (
                        <Fragment>
                            <h1 className="dashboard-heading display-3">
                                Welcome to Dashboard
                            </h1>
                        </Fragment>
                    )}
                </Jumbotron>
            </Container>
        </div>
    );
}

Dashboard.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
