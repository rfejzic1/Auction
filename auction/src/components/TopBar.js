import React from 'react'
import { Link } from 'react-router-dom';

import Social from './Social';

const Links = () => 
    <span>
        <Link to='/login'>Login</Link> or <Link to='/register'>Create new account</Link>
    </span>

const TopBar = () => {
    return (
        <div className='topBar'>
            <div>
                <Social/>
                <Links/>
            </div>
        </div>
    )
}

export default TopBar;
