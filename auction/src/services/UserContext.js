import React, { createContext, useReducer } from 'react'

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
