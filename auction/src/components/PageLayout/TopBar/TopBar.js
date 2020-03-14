import React , { useContext } from 'react'
import { Link } from 'react-router-dom';

import { topBar } from './TopBar.module.scss';

import { UserContext } from '../../../services/UserContext';
import { logout } from '../../../services/SessionService';

import Social from '../../Common/Social';
import Wrapper from '../../Common/Wrapper';

const TopBar = () => {
    const { userData, dispatch } = useContext(UserContext);
    const { loggedIn } = userData;
    const logoutHandler = e => {
        e.preventDefault();
        logout(dispatch);
    };

    return (
        <div className={topBar}>
            <Wrapper flex>
                <Social/>
                {
                    loggedIn ?
                    <span>
                        <Link to='#' onClick={logoutHandler}>Logout</Link>
                    </span>
                    :
                    <span>
                        <Link to='/login'>Login</Link> or <Link to='/register'>Create new account</Link>
                    </span>
                }
            </Wrapper>
        </div>
    )
}

export default TopBar;
