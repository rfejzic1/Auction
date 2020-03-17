import React from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom';

import Wrapper from '../../Common/Wrapper/Wrapper';
import SearchBar from './SearchBar';

import {
    navBar,
    navLinks,
    logo
} from './NavBar.module.scss';

const NavBar = () => {
    const history = useHistory();

    const handleSearch = search => {
        const searchTerms = search
            .trim()
            .split(' ')
            .map(word => word.trim())
            .filter(word => word !== '')
            .join(',');
        
        history.push(`/shop?search=${searchTerms}`);
    };

    return (
        <nav className={navBar}>
            <Wrapper flex>
                <Link to='/' className={logo}>Auction</Link>
                <SearchBar handleSearch={handleSearch} name='search' placeholder='e.g. laptops'/>
                <ul className={navLinks}>
                    <NavLink exact to='/'>HOME</NavLink>
                    <NavLink to='/shop'>SHOP</NavLink>
                    <NavLink to='/myaccount'>MY ACCOUNT</NavLink>
                </ul>
            </Wrapper>
        </nav>

    )
}

export default NavBar;
