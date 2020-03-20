import React from 'react'
import { useHistory } from 'react-router-dom';

import { Button, Wrapper, Divider } from '../Common';

import {
    header,
    message,
    goBackButton,
    logo
} from './Page404.module.scss';

const Page404 = () => {
    const history = useHistory();
    const goBack = () => history.goBack();

    return (
        <>
        <Divider />
        <Wrapper flex around>
            <h1 className={logo}>Auction</h1>
            <span className={header}>404</span>
            <span className={message}>Oops! Looks like the page is Not Found...</span>
            <Button className={goBackButton} onClick={goBack}>
                Go Back
            </Button>
        </Wrapper>
        </>
    )
}

export default Page404;
