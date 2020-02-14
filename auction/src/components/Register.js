import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import TextField from './Controls/TextField';
import Label from './Controls/Label';
import Button from './Controls/Button';
import FormGroup from './Controls/FormGroup';
import Container from './Common/Container';
import Divider from './Common/Divider';
import Breadcrumbs from './Common/Breadcrumbs';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <React.Fragment>
            <Breadcrumbs current='register'/>
            <Divider/>
            <Container title='REGISTER'>
                <FormGroup>
                    <Label isFor='firstName' label='First Name' />
                    <TextField onChange={e => setFirstName(e.target.value)} name='firstName' placeholder='e.g. John' fullWidth />
                </FormGroup>

                <FormGroup>
                    <Label isFor='lastName' label='Last Name' />
                    <TextField onChange={e => setLastName(e.target.value)} name='lastName' placeholder='e.g. Doe' fullWidth />
                </FormGroup>

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
                        onClick={() => console.log(`First name: ${firstName}\nLast name: ${lastName}\nemail: ${email}\npassword: ${password}`)}
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
        </React.Fragment>
    )
}

export default Register;
