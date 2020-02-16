import React, { createContext, useReducer } from 'react'
import Cookies from 'js-cookie';

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

function isUserLoggedIn() {
    return Cookies.get('token') != null;
}

const UserContextProvider = ({ children }) => {
    const [userData, dispatch] = useReducer(userDataReducer, {
        loggedIn: isUserLoggedIn()
    });

    return (
        <UserContext.Provider value={{userData, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
