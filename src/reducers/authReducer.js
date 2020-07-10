import {
    USER_LOADING,
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('access_token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case REGISTER_SUCCESS:
            localStorage.setItem('access_token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }

        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.clear();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }

        default:
            return state;
    }
}

export default authReducer;
