import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    TextField,
    FormGroup,
    WishlistButton,
    BidButton,
    Divider
} from '../../Common';

import { 
    productDetails,
    price,
    info,
    highestBid as highestBidClass
} from './ProductDetails.module.scss';

import config from '../../../config';

const getBids = async(productID, setBids) => {
    try {
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products/${productID}/bids`
        });
        setBids(res.data);
    } catch (e) {
        console.log(e);
    }
};

const placeBid = async(productID, value) => {
    try {
        await axios({
            baseURL: config.API_URL,
            url: `/products/${productID}/bids`,
            method: 'POST',
            data: {
                value: Number(value)
            }
        });
    } catch (e) {
        if(e.response.data.status === 422) {
            console.log('Bid is not the highest!');
        } else {
            console.log(e.response);
        }
    }
};

const ProductDetails = ({ product }) => {
    const [bids, setBids] = useState([]);
    const [value, setValue] = useState(0);     
    
    const startPrice = product.startPrice;
    const highestBid = (bids[0] && bids[0].value.toFixed(2));
    
    useEffect(() => {
        const update = () => getBids(product.uuid, setBids);
        const updateInterval = setInterval(update, config.POLLING_TIME);

        update();

        return () => clearInterval(updateInterval);
    }, [product.uuid]);
    
    const displayDate = milis => {
        return new Date(milis).toDateString();
    };

    const handleValueUpdate = e => {
        setValue(e.target.value);
    }

    const handleBid = () => {
        placeBid(product.uuid, value);
    };

    return (
        <div className={productDetails}>
            <h2>{product.name}</h2>
            <p className={price}>Starts at ${startPrice.toFixed(2)}</p>
            <FormGroup margin='none'>
                <TextField onChange={handleValueUpdate} />
                <BidButton text='Place Bid' outline='primary' fat onClick={handleBid} product={product}/>
                <span className={info}>
                    {
                        bids.length > 0 ? `Enter more than $${highestBid}` : `Enter $${highestBid || startPrice} or more`
                    }
                </span>
            </FormGroup>
            <FormGroup margin='larger'>
                <span className={info}>Highest bid: <span className={highestBidClass}>{highestBid ? `$${highestBid}` : 'none'}</span></span>
                <span className={info}>No bids: {bids.length}</span>
                <span className={info}>Expires at {displayDate(product.endDate)}</span>
            </FormGroup>
            <WishlistButton product={product} outline='gray' fat />
            <FormGroup>
                <span>Details:</span>
                <Divider visible/>
                <p>{product.description}</p>
            </FormGroup>
        </div>
    )
}

export default ProductDetails;
