import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Wrapper, Breadcrumbs, Divider } from '../Common';
import PageLayout from '../PageLayout';
import Page404 from '../Page404';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';

import config from '../../config';

const getProduct = async uuid => {
    try {
        const res = await axios({
            url: `/products/${uuid}`,
            baseURL: config.API_URL
        });
        return res.data;
    } catch {
        return null;
    }
};

const useProduct = (uuid) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct(uuid)
            .then(resProduct => {
                setLoading(false);
                setProduct(resProduct);
            });
    }, [uuid]);

    return {
        loading, product
    };
}

const Page = ({ children }) => {
    return (
        <PageLayout>
            <Breadcrumbs current='Single Product' path='Shop/' />
            <Divider smaller />
            <Wrapper flex normal >
                {children}
            </Wrapper>
            <Divider />
        </PageLayout>
    );
};

const ProductPage = () => {
    const params = useParams();
    const { uuid: productUUID } = params;
    const { loading, product } = useProduct(productUUID);

    return (
        <>
            {
                loading ?
                    <Page>
                        <p>Loading...</p>
                    </Page>
                :
                    (
                    product ?
                        <Page>
                            {
                                product && <>
                                    <ProductGallery images={product.images} />
                                    <ProductDetails product={product} />
                                </>
                            }
                        </Page>
                    :
                        <Page404 />
                    )
            }
        </>
    )
}

export default ProductPage;
