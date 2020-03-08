import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import TextField from '../Controls/TextField';
import Button from '../Controls/Button';
import FormGroup from '../Controls/FormGroup';
import WishlistButton from '../Common/WishlistButton';
import axios from 'axios';
import config from '../../config';

const getBids = async (productID, setBids) => {
    try {
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products/${productID}/bids`
        });
        console.log(res.data);
        setBids(res.data);
    } catch (e) {
        console.log(e);
    }
};

const ProductDetails = ({ product }) => {
    const [bids, setBids] = useState([]);
    const startPrice = product.startPrice;
    const highestBid = (bids[0] && bids[0].value.toFixed(2)) || startPrice;
    const numberOfBids = bids.length;

    useEffect(() => {
        getBids(product.uuid, setBids);
    }, [product.uuid]);

    const displayDate = milis => {
        return new Date(milis).toUTCString();
    };

    return (
        <div className='product-details'>
            <h2>{product.name}</h2>
            <p className='price'>Start's from ${startPrice.toFixed(2)}</p>
            <br/>
            <TextField />
            <Button className='uppercase outlined-primary'>
                Place bid
                <FontAwesomeIcon icon={faChevronRight}/>
            </Button>
            <br/>
            <span className='bid-info'>Enter ${highestBid} or more</span>
            <FormGroup>
                <span className='bid-info'>Highest bid: <span className='primary-bold' >${highestBid}</span></span>
                <br/>
                <span className="bid-info">No bids: {numberOfBids}</span>
                <br/>
                <span className="bid-info">Expires at {displayDate(product.endDate)}</span>
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
