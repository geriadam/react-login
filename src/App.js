import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppNavbar from './layouts/header/AppNavbar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import AppFooter from './layouts/footer/Footer';

import Store from './store';
import { loadUser } from './actions/authActions';

import PrivateRoute from './common/private/privateRoute';

class App extends Component {

    componentDidMount() {
        Store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <Fragment>
                        <header>
                            <AppNavbar />
                        </header>
                        <main className="App mb-5">
                            <Switch>
                                <Redirect exact from='/' to='/login' />
                                <Route exact path='/sign-up' component={Register} />
                                <Route exact path='/login' component={Login} />
                                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            </Switch>
                        </main>
                        <footer>
                            <AppFooter />
                        </footer>
                    </Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
