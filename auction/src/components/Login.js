import React from 'react'
import { Link } from 'react-router-dom';

import TextField from './TextField';
import Label from './Label';
import Button from './Button';
import Container from './Container';
import Wrapper from './Wrapper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlus, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    return (
        <Container title='LOGIN'>
            <Label isFor='email' label='Email' />
            <TextField fullWidth name='email' placeholder='e.g. johndoe@mail.com' />
            <Label isFor='email' label='Password' />
            <TextField name='password' fullWidth password />
            <Button type='primary' fullWidth>Login</Button>
            <Wrapper flex>
                <Button type='gmail'>
                    <FontAwesomeIcon icon={faGooglePlus}/>
                    <span>{'       Login with Gmail'}</span>
                </Button>
                <Button type='facebook'>
                    <FontAwesomeIcon icon={faFacebookSquare}/>
                    <span>{'       Login with Facebook'}</span>
                </Button>
            </Wrapper>
            <Wrapper flex>
                <Link to='/'>Forgot password?</Link>
            </Wrapper>
        </Container>
    )
}

export default Login;
