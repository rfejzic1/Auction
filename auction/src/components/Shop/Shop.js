import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import { Wrapper, Grid, Divider } from '../Common';
import PageLayout from '../PageLayout'
import SubcategoryList from './SubcategoryList';
import ProductCard from './ProductCard';

import config from '../../config';

import { shop } from './Shop.module.scss';

const getProducts = async ({ category, subcategory }) => {
    try {    
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products`,
            params: {
                category,
                subcategory
            }
        })
        return res.data;
    } catch (err) {
        return [];
    }
};

const Shop = () => {
    const location = useLocation();
    const { category, subcategory, search } = queryString.parse(location.search);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts({ category, subcategory })
            .then(products => {
                if (search) {
                    const regexString = search.split(',').map(word => `${word}`).join('|');
                    const regex = new RegExp(regexString, 'gi');
                    products = products.filter(product => product.name.match(regex));
                }

                setProducts(products);
            })
            .catch(err => console.log(err));
        
    }, [category, subcategory, search]);

    return (
        <PageLayout>
            <Divider smaller/>
            <Wrapper>
                <div className={shop}>
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
