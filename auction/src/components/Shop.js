import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import PageLayout from './PageLayout'
import Wrapper from './Common/Wrapper';
import Grid from './Common/Grid';
import SubcategoryList from './Home/SubcategoryList';
import config from '../config';
import ProductCard from './Shop/ProductCard';
import Divider from './Common/Divider';

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
            <Divider smaller/>
            <Wrapper>
                <div className='shop'>
                    <aside>
                        <SubcategoryList defaultCategory={category}/>
                    </aside>
                    <main>
                        <Grid>
                            {
                                products.map((product, index) => {
                                    return <ProductCard key={index} product={product} />
                                })
                            }
                        </Grid>
                    </main>
                </div>
            </Wrapper>
            <Divider/>
        </PageLayout>
    )
}

export default Shop
