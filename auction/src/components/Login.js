import React from 'react'
import { Link } from 'react-router-dom';

import TextField from './TextField';
import Label from './Label';
import Button from './Button';
import Container from './Container';
import Wrapper from './Wrapper';

const Login = () => {
    return (
        <Container title='LOGIN'>
            <Label isFor='email' label='Email' />
            <TextField fullWidth name='email' placeholder='e.g. johndoe@mail.com' />
            <Label isFor='email' label='Password' />
            <TextField name='password' fullWidth password />
            <Button type='primary' fullWidth>Login</Button>
            <Wrapper flex>
                <Button type='gmail'>Login with Gmail</Button>
                <Button type='facebook'>Login with facebook</Button>
            </Wrapper>
            <Wrapper flex>
                <Link to='/'>Forgot password?</Link>
            </Wrapper>
        </Container>
    )
}

export default Login;
