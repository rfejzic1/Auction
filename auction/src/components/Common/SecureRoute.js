import React, { useContext } from 'react'

import { UserContext } from '../../services/UserContext';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(UserContext);
    const { loggedIn } = userData;

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? 
                <Component {...props} />
                :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { referrer: props.location }
                    }}
                />
            }
        />
    )
}

export default SecureRoute
