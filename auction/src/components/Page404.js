import React from 'react'
import Wrapper from './Common/Wrapper';
import Divider from './Common/Divider';

const Page404 = () => {
    return (
        <>
        <Divider/>
        <Wrapper flex around>
            <h1 className='logo'>Auction</h1>
            <span className='header-404'>404</span>
            <span className='message-404'>Oops! Looks like the page is Not Found...</span>
        </Wrapper>
        </>
    )
}

export default Page404;
