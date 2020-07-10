import {
    GET_ERROR,
    CLEAR_ERROR
} from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null, errors) => {
    return {
        type: GET_ERROR,
        payload: { msg, status, id, errors }
    };
}


// CLEAR ERRORS
export const clearErrors = () => {
    return { type: CLEAR_ERROR };
}
