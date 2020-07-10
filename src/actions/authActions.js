import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR
} from './types';

import { LOGIN_URL, USER_URL, REGISTER_URL, LOGOUT_URL } from '../config/constants'

import { returnErrors, clearErrors } from './errorActions';
import setHeaders from '../config/setHeaders';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {

    // Dispatch user loading
    dispatch({ type: USER_LOADING });

    // Get user
    axios.get(USER_URL, setHeaders(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.dataq
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'USER_LOADING'));
            dispatch({ type: AUTH_ERROR });
        });
}

// Register user
export const registerUser = ({
    firstName,
    lastName,
    email,
    phone_number,
    color,
    password,
    cPassword
}, history) => dispatch => {

    // Set headers value
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    // Parsing body
    const body = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phone_number,
        color: color,
        password: password,
        password_confirmation: cPassword
    });

    // Register
    axios.post(REGISTER_URL, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            // Clear errors
            dispatch(clearErrors());

            history.push('/login');
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL', err.response.data.errors));
            dispatch({ type: REGISTER_FAIL });
        });
}

// Login user
export const loginUser = ({ email, password }, history) => dispatch => {

    // Set headers value
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Parsing body
    const body = JSON.stringify({ email, password });

    // Login
    axios.post(LOGIN_URL, body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data
            });

            // Clear erros
            dispatch(clearErrors());

            history.push('/dashboard');
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL', err.response.data.errors));
            dispatch({ type: LOGIN_FAIL });
        });
}

// Logout user
export const logoutUser = history => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
    history.push('/login');
}
