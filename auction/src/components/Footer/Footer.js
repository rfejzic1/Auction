import React from 'react';
import { Link } from 'react-router-dom';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Button, TextField, Social } from '../Common';

import { footer, title, column, textFieldDark } from './Footer.module.scss';

const Column = ({ children }) => {
    return <div className={column}>{children}</div>
}

const Footer = () => {
    return (
        <footer className={footer}>
            <Column>
                <span className={title}>Auction</span>
                <Link to='/aboutus'>About Us</Link>
                <Link to='/terms-and-conditions'>Terms and Conditions</Link>
                <Link to='/privacy-and-policy'>Privacy and Policy</Link>
            </Column>
            <Column>
                <span className={title}>Get in Touch</span>
                <span>Call us at +123 797-567-2535</span>
                <span>support@auction.com</span>
                <Social/>
            </Column>
            <Column>
                <span className={title}>Newsletter</span>
                <span>Enter your email address and get notified about new products. We hate spam!</span>
                <TextField  className={textFieldDark} name='newsletter' placeholder='Your Email address'/>
                <Button 
                    fill='dark'
                    outline='primary'
                    fat
                    iconRight={faChevronRight}
                    text='GO'/>
            </Column>
        </footer>
    )
}

export default Footer
