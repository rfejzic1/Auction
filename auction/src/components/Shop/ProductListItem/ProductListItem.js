import React from 'react';

import { Wrapper, WishlistButton, BidButton } from '../../Common';

import {
    image as imageClass,
    details as detailsClass,
    title,
    description as descriptionClass,
    price
} from './ProductListItem.module.scss';

const ProductListItem = ({ product }) => {
    const { images, name, description, startPrice } = product;
    const image = images && images[0] && images[0].uri;

    const priceString = `Starts at $${startPrice.toFixed(2)}`;

    return (
        <Wrapper flex normal noPadding>
            <img className={imageClass} src={image}/>
            <div className={detailsClass}>
                <p className={title}>{name}</p>
                <p className={descriptionClass}>{description}</p>
                <p className={price}>{priceString}</p>
                <WishlistButton block product={product} fat fill='light' outline='gray'/>
                <BidButton hammer text='Bid' fat fill='light' outline='gray' product={product}/>
            </div>
        </Wrapper>
    );
}

export default ProductListItem;
