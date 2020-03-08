import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageLayout from './PageLayout';
import Divider from './Common/Divider';
import Wrapper from './Common/Wrapper';
import Jumbotron from './Home/Jumbotron';
import config from '../config';

const getProducts = async setProducts => {
    try {
        const res = await axios({
            baseURL: config.API_URL,
            url: '/products'
        });

        console.log(res.data);
        setProducts(res.data);
    } catch (err) {
        console.log(err);
    }
};

const Home = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts(setProducts);
    }, []);

    return (
        <PageLayout>
            { products && <Jumbotron product={products[1]} />}
            <Wrapper>
                lols
            </Wrapper>
            <Divider/>
        </PageLayout>
    )
}

export default Home;
