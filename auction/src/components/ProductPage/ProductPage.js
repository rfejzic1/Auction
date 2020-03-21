import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Wrapper, Breadcrumbs, Divider } from '../Common';
import PageLayout from '../PageLayout';
import Page404 from '../Page404';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';

import config from '../../config';

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
    const { uuid: productUUID } = params;

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct(productUUID, setProduct);
    }, [productUUID]);

    return (
        <>
            {
                product ?
                    <PageLayout>
                        <Breadcrumbs current='Single Product' path='Shop/' />
                        <Divider smaller />
                        <Wrapper flex normal >
                            {
                                product && <>
                                    <ProductGallery images={product.images} />
                                    <ProductDetails product={product} />
                                </>
                            }
                        </Wrapper>
                        <Divider />
                    </PageLayout>
                :
                    <Page404 />
            }
        </>
    )
}

export default ProductPage;
