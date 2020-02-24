import React from 'react';

import TextField from '../Controls/TextField';
import Button from '../Controls/Button';
import FormGroup from '../Controls/FormGroup';

const ProductDetails = ({ product }) => {
    return (
        <div className='product-details'>
            <h2>{product.name}</h2>
            <span className='price'>Start from $240.00</span>
            <br/>
            <TextField />
            <Button className='uppercase' >Place bid</Button>
            <br/>
            <span className='bid-info'>Enter $260.00 or more</span>
            <FormGroup>
                <span className='bid-info'>Highest bid: $260.00</span>
                <br/>
                <span className="bid-info">No bids: 2</span>
                <br/>
                <span className="bid-info">10 days</span>
            </FormGroup>
            <Button>Whishlist {'<3'}</Button>
            <br/>
            <br/>
            <span>Details:</span>
            <hr/>
            <p>{product.description}</p>
        </div>
    )
}

export default ProductDetails;
