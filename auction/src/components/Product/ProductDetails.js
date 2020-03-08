import React, { useState, useEffect } from 'react';

import TextField from '../Controls/TextField';
import FormGroup from '../Controls/FormGroup';
import WishlistButton from '../Common/WishlistButton';
import axios from 'axios';
import config from '../../config';
import BidButton from '../Common/BidButton';

const getBids = async (productID, setBids) => {
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

const placeBid = async (productID, value) => {
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
            alert('Bid is not the highest!');
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
        return new Date(milis).toString();
    };

    const handleValueUpdate = e => {
        setValue(e.target.value);
    }

    const handleBid = () => {
        placeBid(product.uuid, value);
    };

    return (
        <div className='product-details'>
            <h2>{product.name}</h2>
            <p className='price'>Starts at ${startPrice.toFixed(2)}</p>
            <br/>
            <TextField onChange={handleValueUpdate} />
            <BidButton text='Place Bid' onClick={handleBid} className='outlined-primary uppercase' product={product} />
            <br/>
            <span className='bid-info'>
                {
                    bids.length > 0 ? `Enter more than $${highestBid}` : `Enter $${highestBid || startPrice} or more`
                }
            </span>
            <FormGroup>
                <span className='bid-info'>Highest bid: <span className='primary-bold' >{highestBid ? `$${highestBid}` : 'none'}</span></span>
                <br/>
                <span className="bid-info">No bids: {bids.length}</span>
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