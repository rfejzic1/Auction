import React from 'react';

import Wrapper from '../../Common/Wrapper';
import CategoryList from './CategoryList';
import BidButton from '../../Common/BidButton';

const randomImage = images => {
    if (images && images.length <= 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    return images[randomIndex].uri;
}

const ProductHighlight = ({ product }) => {
    const uri = randomImage(product.images);
    const startPrice = product.startPrice;

    return (
        <div className="product-highlight">
            <div className='details'>
                <div className='name'>
                    {product.name}
                </div>
                <div className='price'>
                    {`Starts from $${startPrice.toFixed(2)}`}
                </div>
                <div className='description'>
                    {product.description}
                </div>
                <BidButton text='Bid now' className='outlined-primary uppercase' product={product} />
            </div>
            <img src={uri} alt="Shoes"/>
        </div>
    );
};

const Jumbotron = ({ product }) => {
    return (
        <div className="jumbotron">
            <Wrapper flex normal>
                <CategoryList/>
                <ProductHighlight product={product} />
            </Wrapper>
        </div>
    );
}

export default Jumbotron;
