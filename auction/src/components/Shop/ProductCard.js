import React from 'react';
import WishlistButton from '../Common/WishlistButton';
import BidButton from '../Common/BidButton';

const ProductCard = ({ product }) => {
    const { images } = product;
    const image = images && images[0] && images[0].uri;

    return (
        <div className='product-card'>
        {
            product &&
            <>
                <img src={image} alt="Product"/>
                <div className="overlay">
                    <WishlistButton block product={product} />
                    <BidButton block product={product} />
                </div>
                <span className='product-name'>
                    {product.name}
                </span>
                <span className='product-price'>
                    {`Starts from $${product.startPrice.toFixed(2)}`}
                </span>
            </>
        }
        </div>
    )
};

export default ProductCard;
