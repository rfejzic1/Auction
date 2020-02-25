import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import PageLayout from './PageLayout'
import Wrapper from './Common/Wrapper';
import SubcategoryList from './Home/SubcategoryList';
import config from '../config';

const getProducts = async ({ category, subcategory }, setProducts) => {
    try {    
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products`,
            params: {
                category,
                subcategory
            }
        })
        setProducts(res.data);
    } catch (err) {
        setProducts([]);
    }
};

const Shop = () => {
    const location = useLocation();
    const { category, subcategory } = queryString.parse(location.search);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts({ category, subcategory }, setProducts);
    }, [category, subcategory]);

    return (
        <PageLayout>
            <Wrapper>
                <SubcategoryList defaultCategory={category}/>
                <ul>
                    {
                        products.map((product, index) => {
                            return <li key={index}>{product.name}</li>
                        })
                    }
                </ul>
            </Wrapper>
        </PageLayout>
    )
}

export default Shop
