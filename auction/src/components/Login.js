import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlus, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import { UserContext } from '../services/UserContext';
import { login } from '../services/SessionService';

import TextField from './Controls/TextField';
import Label from './Controls/Label';
import Button from './Controls/Button';
import Container from './Common/Container';
import Divider from './Common/Divider';
import FormGroup from './Controls/FormGroup';
import Breadcrumbs from './Common/Breadcrumbs';

const Login = ({ location }) => {
    const { userData, dispatch} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const refferer = location.state && location.state.referrer;
    const redirectPath = refferer ? refferer.path : '/';

    return (
        <>
            {userData.loggedIn ?
            <Redirect to={redirectPath} />
            :
            <>
            <Breadcrumbs current='login'/>
            <Divider/>
            <Container title='LOGIN'>
                <FormGroup>
                    <Label isFor='email' label='Email' />
                    <TextField onChange={e => setEmail(e.target.value)} name='email' placeholder='e.g. johndoe@mail.com' fullWidth />
                </FormGroup>
                <FormGroup>
                    <Label isFor='password' label='Password' />
                    <TextField onChange={e => setPassword(e.target.value)} name='password' fullWidth password />
                </FormGroup>
                <FormGroup>
                    <Button 
                        onClick={() => login(dispatch, { email, password })} 
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
                    <Link to='#'>Forgot password?</Link>
                </FormGroup>
            </Container>
            <Divider/>
            </>
            }
        </>
    )
}

export default Login;
