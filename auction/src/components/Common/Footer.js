import React from 'react'
import { Link } from 'react-router-dom'

import Social from './Social';
import TextField from '../Controls/TextField';
import Button from '../Controls/Button';

const Column = ({ children }) => {
    return <div className="column">{children}</div>
}

const Footer = () => {
    return (
        <footer className='footer'>
            <Column>
                <span className="title">Auction</span>
                <Link to='/aboutus'>About Us</Link>
                <Link to='/terms-and-conditions'>Terms and Conditions</Link>
                <Link to='/privacy-and-policy'>Privacy and Policy</Link>
            </Column>
            <Column>
                <span className="title">Get in Touch</span>
                <span>Call us at +123 797-567-2535</span>
                <span>support@auction.com</span>
                <Social/>
            </Column>
            <Column>
                <span className="title">Newsletter</span>
                <span>Enter your email address and get notified about new products. We hate spam!</span>
                <TextField  className='text-field-dark' name='newsletter' placeholder='Your Email address'/>
                <Button className='btn-dark'>GO</Button>
            </Column>
        </footer>
    )
}

export default Footer
