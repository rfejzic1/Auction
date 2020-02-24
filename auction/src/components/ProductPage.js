import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Wrapper from './Common/Wrapper';
import Breadcrumbs from './Common/Breadcrumbs';
import Divider from './Common/Divider';
import PageLayout from './PageLayout';
import config from '../config';
import Page404 from './Page404';
import ProductGallery from './Product/ProductGallery';
import ProductDetails from './Product/ProductDetails';

const getProduct = async (uuid, setProduct) => {
    try {
        const res = await axios({
            url: `/products/${uuid}`,
            baseURL: config.API_URL
        });
        return setProduct(res.data);
    } catch {
        return setProduct(null);
    }
}

const ProductPage = () => {
    const params = useParams();
    const { productUUID } = params;

    const [product, setProduct] = useState({});

    const images = [
        'https://assets.adidas.com/images/w_600,f_auto,q_auto:sensitive,fl_lossy/985126faac9345fbafa8a8dd008d1a68_9366/Duramo_9_Shoes_Black_BB7066_01_standard.jpg',
        'https://images.sg.content-cdn.io/cdn//in-resources/c4744b13-9b67-4f22-bf8b-9463f15cd7a6/Images/ProductImages/Source/BB7066-C.jpg',
        'https://www.efootwear.eu/media/catalog/product/cache/image/650x650/0/0/0000200462745_01_wj.jpg',
        'https://pa.namshicdn.com/product/49/3904/v1/4-zoom-desktop.jpg'
    ];

    useEffect(() => {
        getProduct(productUUID, setProduct);
    }, [productUUID, product]);

    return (
        <>
            {
                product == null ?
                    <Page404 />
                :
                    <PageLayout>
                        <Breadcrumbs current='Single Product' path='Shop/' />
                        <Divider smaller />
                        <Wrapper flex normal >
                            <ProductGallery images={images}/>
                            <ProductDetails product={product} />
                        </Wrapper>
                        <Divider />
                    </PageLayout>
            }
        </>
    )
}

export default ProductPage;