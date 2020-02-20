import React from 'react'
import { NavLink, Link } from 'react-router-dom';

import Wrapper from './Wrapper';
import SearchBar from './SearchBar';

const NavBar = () => {
    return (
        <nav className='nav-bar'>
            <Wrapper flex>
                <Link to='/' className='logo'>Auction</Link>
                <SearchBar name='search' placeholder='e.g. laptops'/>
                <ul className='nav-links'>
                    <NavLink exact to='/'>HOME</NavLink>
                    <NavLink to='/shop'>SHOP</NavLink>
                    <NavLink to='/myaccount'>MY ACCOUNT</NavLink>
                </ul>
            </Wrapper>
        </nav>

    )
}

export default NavBar;
