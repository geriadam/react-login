import {
    GET_ERROR,
    CLEAR_ERROR
} from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    id: null,
    errors: {}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERROR:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id,
                errors: action.payload.errors
            }

        case CLEAR_ERROR:
            return {
                msg: {},
                status: null,
                id: null,
                errors: {}
            }

        default:
            return state;
    }
}

export default errorReducer;
