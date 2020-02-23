import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Wrapper from './Common/Wrapper';
import PageLayout from './PageLayout';
import config from '../config';

const getProduct = (uuid, setProduct) => {
    console.log(axios.defaults.baseURL);
    return axios({
        url: `/products/4cb9fbe7-5702-4147-b063-7bdd83b4615b`,
        baseURL: config.API_URL
    })
        .then(res => setProduct(res.data))
        .catch(err => console.log(err.response))
}

const ProductPage = () => {
    const params = useParams();
    const { productUUID } = params;

    const [product, setProduct] = useState({});

    useEffect(() => {
        console.log(productUUID);
        getProduct(productUUID, setProduct);
    }, [productUUID]);

    return (
        <div>
            <PageLayout>
                <Wrapper>
                    <h1>Product {product.name}</h1>
                </Wrapper>
            </PageLayout>
        </div>
    )
}

export default ProductPage;
