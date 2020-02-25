import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Button from '../Controls/Button';

const WishlistButton = () => {
    return (
        <Button > 
            Whishlist
            <FontAwesomeIcon icon={faHeart}/>
        </Button>
    )
}

export default WishlistButton;
