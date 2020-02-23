import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Wrapper from './Common/Wrapper';
import PageLayout from './PageLayout';
import config from '../config';
import Page404 from './Page404';

const getProduct = async (uuid, setProduct) => {
    const res = await axios({
        url: `/products/${uuid}`,
        baseURL: config.API_URL
    });
    return setProduct(res.data);
}

const ProductPage = () => {
    const params = useParams();
    const { productUUID } = params;

    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct(productUUID, setProduct);
    }, [productUUID]);

    return (
        <>
            {
                product ?
                    <PageLayout>
                        <Wrapper>
                            <h1>Product {product.name}</h1>
                        </Wrapper>
                    </PageLayout>
                :
                    <Page404 />
            }
        </>
    )
}

export default ProductPage;
