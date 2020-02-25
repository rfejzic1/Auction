import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import PageLayout from './PageLayout'
import Wrapper from './Common/Wrapper';
import SubcategoryList from './Home/SubcategoryList';
import config from '../config';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

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
    } catch {
        setProducts([]);
    }
};

const Shop = () => {
    const query = useQuery();
    const categorization = {
        category: query.get("category").slice(1,-1),
        subcategory: query.get("subcategory")
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts(categorization, setProducts);
    }, [categorization]);

    return (
        <PageLayout>
            <Wrapper>
                <SubcategoryList defaultCategory={query.get("category")}/>
                <ul>
                    { products.map((product, index) => {
                        return <li key={index}>{product.name}</li>
                    }) }
                </ul>
            </Wrapper>
        </PageLayout>
    )
}

export default Shop
