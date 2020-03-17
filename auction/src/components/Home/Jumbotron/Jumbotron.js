import React from 'react';

import CategoryList from './CategoryList';
import { BidButton, Wrapper } from '../../Common';

import {
    jumbotron,
    productHighlight,
    details,
    name,
    price,
    description
} from './Jumbotron.module.scss';

const randomImage = images => {
    if (images && images.length > 0) {
        const randomIndex = Math.floor(Math.random() * (images.length - 1));
        return images[randomIndex].uri;
    }

    return null;    
}

const ProductHighlight = ({ product }) => {
    const uri = randomImage(product.images);
    const startPrice = product.startPrice;

    return (
        <div className={productHighlight}>
            <div className={details}>
                <div className={name}>
                    {product.name}
                </div>
                <div className={price}>
                    {`Starts from $${startPrice.toFixed(2)}`}
                </div>
                <div className={description}>
                    {product.description}
                </div>
                <BidButton text='Bid now' className='outlined-primary uppercase' product={product} />
            </div>
            <img src={uri} alt='Product'/>
        </div>
    );
};

const Jumbotron = ({ product }) => {
    return (
        <div className={jumbotron}>
            <Wrapper flex normal>
                <CategoryList/>
                <ProductHighlight product={product} />
            </Wrapper>
        </div>
    );
}

export default Jumbotron;
