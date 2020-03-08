import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Wrapper from '../Common/Wrapper';
import CategoryList from './CategoryList';
import Button from '../Controls/Button';

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
                <Button className='outlined-primary uppercase'>
                    Bid Now
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
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
