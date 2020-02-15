import React, { createContext, useReducer } from 'react'
import axios from 'axios';

export const UserContext = createContext();

function setAuthorizationHeaderDefault(token) {
    axios.defaults.headers.common['Authorization'] = token;
}

const userDataReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            const { user, token } = action;
            setAuthorizationHeaderDefault(token);
            
            return {
                loggedIn: true,
                user
            }
        case 'LOGOUT':
            setAuthorizationHeaderDefault(null);
            return {
                loggedIn: false
            };
        default:
    }
};

const UserContextProvider = ({ children }) => {
    const [userData, dispatch] = useReducer(userDataReducer, {
        loggedIn: false
    });

    return (
        <UserContext.Provider value={{userData, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
