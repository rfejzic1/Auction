import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
    faGooglePlusG,
    faFacebookF,
    faTwitter,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';

const IconLink = ({ icon, color, link }) => {
    return (
        <a href={link} target='blank'>
            <FontAwesomeIcon className='social' color={color} icon={icon} mask={faCircle} transform='shrink-6'/>
        </a>
    );
}

const style = {
    fontSize: 24
};

const Social = () => {
    const color='rgba(255,255,255,0.5)';

    return (
        <span className='social' style={style}>
            <IconLink icon={faFacebookF} color={color} link='https://facebook.com' />
            <IconLink icon={faInstagram} color={color} link='https://instagram.com' />
            <IconLink icon={faTwitter} color={color} link='https://twitter.com' />
            <IconLink icon={faGooglePlusG} color={color} link='https://plus.google.com' />
        </span>
    )
}

export default Social;
