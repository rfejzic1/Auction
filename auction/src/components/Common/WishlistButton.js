import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const WishlistButton = ({...props}) => {
    return (
        <Button {...props}> 
            Wishlist
            <FontAwesomeIcon className='icon-right' icon={faHeart}/>
        </Button>
    )
}

export default WishlistButton;
