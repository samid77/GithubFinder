import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    SET_SEARCHSTATUS,
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        searchStatus: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    /** Get Users (Initial) */
    const getUsers = async() => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    }

    /** Search User */
    const searchUsers = async (text) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })

    }

    /** Get User */
    const getUser = async (username) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    /** Clear Users */
    const clearUserSearch = async () => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: CLEAR_USERS,
            payload: res.data
        })

    }

    /** Get Repos */

    /** Set Loading */
    const setLoading = () => dispatch({ type: SET_LOADING});

    /** Set Search Status */
    const setSearchStatus = () => dispatch({ type: SET_SEARCHSTATUS});

    return <githubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchStatus: state.searchStatus,
            searchUsers,
            clearUserSearch,
            getUsers,
            getUser,
        }}
    >
        {props.children}
    </githubContext.Provider>
}

export default GithubState;
