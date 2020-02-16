import React , { useContext } from 'react'
import { Link } from 'react-router-dom';

import { UserContext } from '../../services/UserContext';
import { logout } from '../../services/SessionService';

import Social from './Social';
import Wrapper from './Wrapper';

const TopBar = () => {
    const { userData, dispatch } = useContext(UserContext);
    const { loggedIn } = userData;
    return (
        <div className='topBar'>
            <Wrapper flex>
                <Social/>
                {
                    loggedIn ?
                    <span>
                        <Link 
                        to='#'
                        onClick={e => {
                            e.preventDefault();
                            logout(dispatch);
                        }}>Logout</Link>
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
