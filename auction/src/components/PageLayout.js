import React from 'react'

import TopBar from './Common/TopBar';
import NavBar from './Common/NavBar';

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
