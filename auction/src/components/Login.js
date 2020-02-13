import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import TextField from './Controls/TextField';
import Label from './Controls/Label';
import Button from './Controls/Button';
import Container from './Common/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlus, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import FormGroup from './Controls/FormGroup';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container title='LOGIN'>
            <FormGroup>
                <Label isFor='email' label='Email' />
                <TextField onChange={e => setEmail(e.target.value)} name='email' placeholder='e.g. johndoe@mail.com' fullWidth />
            </FormGroup>
            <FormGroup>
                <Label isFor='email' label='Password' />
                <TextField onChange={e => setPassword(e.target.value)} name='password' fullWidth password />
            </FormGroup>
            <FormGroup>
                <Button 
                    onClick={(e) => console.log(`email: ${email}\npassword: ${password}`)} 
                    type='primary' 
                    fullWidth>
                        Login
                </Button>
            </FormGroup>
            <FormGroup flex>
                <Button type='gmail'>
                    <FontAwesomeIcon icon={faGooglePlus}/>
                    <span>{' Login with Gmail'}</span>
                </Button>
                <Button type='facebook'>
                    <FontAwesomeIcon icon={faFacebookSquare}/>
                    <span>{' Login with Facebook'}</span>
                </Button>
            </FormGroup>
            <FormGroup flex around>
                <Link to='/'>Forgot password?</Link>
            </FormGroup>
        </Container>
    )
}

export default Login;
