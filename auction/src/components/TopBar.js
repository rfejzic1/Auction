import React from 'react'
import { Link } from 'react-router-dom';

import Social from './Common/Social';
import Wrapper from './Common/Wrapper';

const Links = () => 
    <span>
        <Link to='/login'>Login</Link> or <Link to='/register'>Create new account</Link>
    </span>

const TopBar = () => {
    return (
        <div className='topBar'>
            <Wrapper flex>
                <Social/>
                <Links/>
            </Wrapper>
        </div>
    )
}

export default TopBar;
