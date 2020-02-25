import React, { createContext, useReducer, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../config';

import { setUserLoginState } from './SessionService';

export const UserContext = createContext();

const userDataReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            const { user } = action;           
            return {
                loggedIn: true,
                user
            }
        case 'LOGOUT':
            return {
                loggedIn: false
            };
        default:
    }
};

function setInitialSessionState(dispatch) {
    const token = Cookies.get('token');
    console.log(`Inital token is ${token}`);

    if(token == null) {
        console.log("No token detected");
        dispatch({ type: 'LOGOUT' });
        return;
    }

    axios({
        baseURL: config.API_URL,
        url: `/refresh`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        console.log(res.data);
        setUserLoginState(res, dispatch);
    })
    .catch(err => {
        dispatch({ type: 'LOGOUT' });
        console.log(err.response);
    });
}

const UserContextProvider = ({ children }) => {
    const [userData, dispatch] = useReducer(userDataReducer, {});

    useEffect(() => {
        console.log("Initiated!");
        setInitialSessionState(dispatch);
    }, []);

    return (
        <UserContext.Provider value={{userData, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
