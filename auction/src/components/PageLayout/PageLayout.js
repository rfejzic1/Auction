import React from 'react'

import TopBar from './TopBar';
import NavBar from './NavBar';

const PageLayout = ({ children }) => {
    return (
        <>
            <TopBar/>
            <NavBar/>
            {children}
        </>
    )
}

export default PageLayout;
