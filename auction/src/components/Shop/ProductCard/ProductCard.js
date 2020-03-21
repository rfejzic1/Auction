import React from 'react';

import { BidButton, WishlistButton } from '../../Common';

import {
    productCard,
    productName,
    productPrice,
    overlay
} from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
    const { images } = product;
    const image = images && images[0] && images[0].uri;

    if (product) {
        return (
            <div className={productCard}>
                <img src={image} alt="Product"/>
                <div className={overlay}>
                    <WishlistButton block product={product} fill='light' outline='none'/>
                    <BidButton hammer text='Bid' fill='light' outline='none' product={product}/>
                </div>
                <span className={productName}>
                    {product.name}
                </span>
                <span className={productPrice}>
                    {`Starts from $${product.startPrice.toFixed(2)}`}
                </span>
            </div>
        );
    }

    return null;
};

export default ProductCard;
