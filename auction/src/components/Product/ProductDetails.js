import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import TextField from '../Controls/TextField';
import Button from '../Controls/Button';
import FormGroup from '../Controls/FormGroup';
import WishlistButton from '../Common/WishlistButton';

const ProductDetails = ({ product }) => {
    return (
        <div className='product-details'>
            <h2>{product.name}</h2>
            <p className='price'>Start from $240.00</p>
            <br/>
            <TextField />
            <Button className='uppercase outlined-primary'>
                Place bid
                <FontAwesomeIcon icon={faChevronRight}/>
            </Button>
            <br/>
            <span className='bid-info'>Enter $260.00 or more</span>
            <FormGroup>
                <span className='bid-info'>Highest bid: <span className='primary-bold' >$260.00</span></span>
                <br/>
                <span className="bid-info">No bids: 2</span>
                <br/>
                <span className="bid-info">10 days</span>
            </FormGroup>
            <WishlistButton product={product}/>
            <br/>
            <br/>
            <span>Details:</span>
            <hr/>
            <p>{product.description}</p>
        </div>
    )
}

export default ProductDetails;
