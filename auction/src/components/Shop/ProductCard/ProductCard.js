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

    return (
        <div className={productCard}>
        {
            product &&
            <>
                <img src={image} alt="Product"/>
                <div className={overlay}>
                    <WishlistButton block product={product} />
                    <BidButton hammer text='Bid' product={product} />
                </div>
                <span className={productName}>
                    {product.name}
                </span>
                <span className={productPrice}>
                    {`Starts from $${product.startPrice.toFixed(2)}`}
                </span>
            </>
        }
        </div>
    )
};

export default ProductCard;
