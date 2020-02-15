import React, { createContext, useReducer } from 'react'

export const UserContext = createContext();

const userDataReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            const { email, role } = action;
            return {
                loggedIn: true,
                email,
                role
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
