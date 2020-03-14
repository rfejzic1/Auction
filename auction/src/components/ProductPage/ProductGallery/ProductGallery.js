import React, { useState } from 'react';

import {
    productGallery,
    mainImage,
    thumbnails
} from './ProductGallery.module.scss';

const Thumbnail = ({ url, selectImage }) => {
    const handleSelectImage = () => selectImage(url);
    return (
        <img onClick={handleSelectImage} src={url} alt='Product' />
    )
}

const ProductGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(images && images[0] && images[0].uri);

    const selectImage = url => {
        setCurrentImage(url);
    }

    return (
        <div className={productGallery}>
            <div className={mainImage}>
                <img src={currentImage} alt='Product'/>
            </div>
            <div className={thumbnails}>
                { images.map((image, index) => <Thumbnail selectImage={selectImage} key={index} url={image.uri} />) }
            </div>
        </div>
    )
}

export default ProductGallery;
