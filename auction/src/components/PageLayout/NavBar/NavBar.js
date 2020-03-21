import React from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom';

import Wrapper from '../../Common/Wrapper/Wrapper';
import SearchBar from './SearchBar';

import {
    navBar,
    navLink,
    logo,
    active
} from './NavBar.module.scss';

const StyledLink = ({ children, ...props}) => {
    return <NavLink className={navLink} activeClassName={active} {...props}>{children}</NavLink>
}

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
                <ul>
                    <StyledLink exact to='/'>HOME</StyledLink>
                    <StyledLink to='/shop'>SHOP</StyledLink>
                    <StyledLink to='/myaccount'>MY ACCOUNT</StyledLink>
                </ul>
            </Wrapper>
        </nav>

    )
}

export default NavBar;
