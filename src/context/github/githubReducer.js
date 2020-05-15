import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_USERS,
    GET_REPOS,
    SET_LOADING,
    SET_SEARCHSTATUS,
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: false,
                searchStatus: false,
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                searchStatus: true,
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                searchStatus: false,
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_SEARCHSTATUS:
            return {
                ...state,
                searchStatus: true
            }
        default: 
            return state;
    }
}