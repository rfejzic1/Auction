import React from 'react'
import { useHistory } from 'react-router-dom';

import { Button, Wrapper, Divider } from '../Common';

const Page404 = () => {
    const history = useHistory();
    const goBack = () => history.goBack();

    return (
        <>
        <Divider/>
        <Wrapper flex around>
            <h1 className='logo'>Auction</h1>
            <span className='header-404'>404</span>
            <span className='message-404'>Oops! Looks like the page is Not Found...</span>
            <Button className='margin-1 outlined-primary' onClick={goBack}>
                Go Back
            </Button>
        </Wrapper>
        </>
    )
}

export default Page404;
