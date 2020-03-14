import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
    faGooglePlusG,
    faFacebookF,
    faTwitter,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';

import { social } from './Social.module.scss';

const IconLink = ({ icon, link }) => {
    return (
        <a href={link} target='blank'>
            <FontAwesomeIcon className={social} icon={icon} mask={faCircle} transform='shrink-6'/>
        </a>
    );
}

const Social = () => {
    return (
        <span className={social}>
            <IconLink icon={faFacebookF} link='https://facebook.com' />
            <IconLink icon={faInstagram} link='https://instagram.com' />
            <IconLink icon={faTwitter} link='https://twitter.com' />
            <IconLink icon={faGooglePlusG} link='https://plus.google.com' />
        </span>
    )
}

export default Social;
