import React from 'react';

import Wrapper from '../Common/Wrapper';
import CategoryList from './CategoryList';

const ProductHighlight = ({ product }) => {
  const uri = product.images[0].uri;
  const startPrice = product.startPrice;

  return (
        <div className="product-highlight">
            <img src={uri} alt="Shoes"/>
            <span className='product-name'>
                {product.name}
            </span>
            <span className='product-price'>
                {`Starts from $${startPrice.toFixed(2)}`}
            </span>
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
