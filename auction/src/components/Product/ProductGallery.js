import React, { useState } from 'react';

const Thumbnail = ({ url, selectImage }) => {
    const handleSelectImage = () => selectImage(url);
    return (
        <img onClick={handleSelectImage} src={url} alt='Product image' />
    )
}

const ProductGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(images[0]);

    const selectImage = url => {
        setCurrentImage(url);
    }

    return (
        <div className='product-gallery'>
            <div className="main-image">
                <img src={currentImage} alt='Product image'/>
            </div>
            <div className='thumbnails'>
                { images.map((imageURL, index) => <Thumbnail selectImage={selectImage} key={index} url={imageURL} />) }
            </div>
        </div>
    )
}

export default ProductGallery;
