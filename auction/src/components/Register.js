import React, { useState, useContext } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';

import TextField from './Controls/TextField';
import Label from './Controls/Label';
import Button from './Controls/Button';
import FormGroup from './Controls/FormGroup';
import Container from './Common/Container';
import Divider from './Common/Divider';
import Breadcrumbs from './Common/Breadcrumbs';

import { UserContext } from '../services/UserContext';
import { register } from '../services/SessionService';

const Register = () => {
    const { userData, dispatch } = useContext(UserContext);
    const location = useLocation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = e => setFirstName(e.target.value);
    const handleLastNameChange = e => setLastName(e.target.value);
    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleRegister = () => register(dispatch, { firstName, lastName, email, password });

    const refferer = location.state && location.state.referrer;
    const redirectPath = refferer ? refferer.path : '/';

    return (
        <>
        {userData.loggedIn ?
        <Redirect to={redirectPath} />
        :
        <>
            <Breadcrumbs current='register'/>
            <Divider/>
            <Container title='REGISTER'>
                <FormGroup>
                    <Label isFor='firstName' label='First Name' />
                    <TextField onChange={handleFirstNameChange} name='firstName' placeholder='e.g. John' fullWidth />
                </FormGroup>

                <FormGroup>
                    <Label isFor='lastName' label='Last Name' />
                    <TextField onChange={handleLastNameChange} name='lastName' placeholder='e.g. Doe' fullWidth />
                </FormGroup>

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
                        onClick={handleRegister}
                        type='primary' 
                        fullWidth>
                            Register
                    </Button>
                </FormGroup>

                <FormGroup flex around>
                    <span>
                        Already have an account? <Link to='/login'>Login</Link>
                    </span>
                </FormGroup>
            </Container>
            <Divider/>
        </>
        }
        </>
    )
}

export default Register;
