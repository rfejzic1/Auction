import React, { useState, useContext } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom';

import { faGooglePlus, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import { UserContext } from '../../services/UserContext';
import { login } from '../../services/SessionService';

import {
    TextField,
    Label,
    Button,
    Container,
    Divider,
    FormGroup,
    Breadcrumbs
} from '../Common';

import PageLayout from '../PageLayout';

const Login = () => {
    const { userData, dispatch } = useContext(UserContext);
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const refferer = location.state && location.state.referrer;
    const redirectPath = refferer ? refferer.pathname : '/';

    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleLogin = () => login(dispatch, { email, password });

    return (
        <>
            {
                userData.loggedIn ?
                    <Redirect to={redirectPath}/>
                :
                    <PageLayout>
                        <Breadcrumbs current='login'/>
                        <Divider/>
                        <Container title='LOGIN'>
                            <FormGroup>
                                <Label isFor='email' label='Email' />
                                <TextField onChange={handleEmailChange} name='email' placeholder='e.g. johndoe@mail.com' fullWidth />
                            </FormGroup>
                            <FormGroup>
                                <Label isFor='password' label='Password' />
                                <TextField onChange={handlePasswordChange} name='password' fullWidth password />
                            </FormGroup>
                            <FormGroup>
                                <Button 
                                    onClick={handleLogin} 
                                    fill='primary' 
                                    outline='none'
                                    strong
                                    fat
                                    fullWidth
                                    text='Login'/>
                            </FormGroup>
                            <FormGroup flex around>
                                <Button
                                    fill='gmail'
                                    outline='none'
                                    strong
                                    text='Login with Gmail'
                                    iconLeft={faGooglePlus}/>
                                <Button
                                    fill='facebook'
                                    outline='none'
                                    strong
                                    text='Login with Facebook'
                                    iconLeft={faFacebookSquare}/>
                            </FormGroup>
                            <FormGroup flex around>
                                <Link to='#'>Forgot password?</Link>
                            </FormGroup>
                        </Container>
                        <Divider/>
                    </PageLayout>
            }
        </>
    )
}

export default Login;
