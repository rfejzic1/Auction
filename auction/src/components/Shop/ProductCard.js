import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className='product-card'>
            <img src="https://assets.adidas.com/images/w_600,f_auto,q_auto:sensitive,fl_lossy/985126faac9345fbafa8a8dd008d1a68_9366/Duramo_9_Shoes_Black_BB7066_01_standard.jpg" alt="Shoes"/>
            <span className='product-name'>
                {product.name}
            </span>
            <span className='product-price'>
                {`Starts from $${product.auction.startPrice.toFixed(2)}`}
            </span>
        </div>
    )
};

export default ProductCard;
