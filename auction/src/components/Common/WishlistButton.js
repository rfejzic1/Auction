import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const WishlistButton = ({...props}) => {
    return (
        <Button {...props} text='Wishlist' iconRight={faHeart}/>
    )
}

export default WishlistButton;
