import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import { Wrapper, Grid, Divider, Button } from '../Common';
import PageLayout from '../PageLayout'
import SubcategoryList from './SubcategoryList';
import ProductCard from './ProductCard';

import config from '../../config';

import { shop, noProductsMessage } from './Shop.module.scss';

const PAGE_SIZE = 9;

const getProducts = async ({ category, subcategory, page }) => {
    try {    
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products`,
            params: {
                category,
                subcategory,
                page,
                size: PAGE_SIZE
            }
        })
        return res.data;
    } catch (err) {
        return [];
    }
};

const ProductsView = ({ products, canLoadNewPage, loadNextPage }) => {
    if (products.length > 0) {
        return (
            <>
                <Grid>
                    {products.map((product, index) => {
                        return <ProductCard key={index} product={product} />
                    })}
                </Grid>
                <Divider />
                <Wrapper flex around>
                    {
                        canLoadNewPage 
                        && 
                        <Button
                            onClick={loadNextPage}
                            text='EXPLORE MORE'
                            fill='primary'
                            outline='none'/>
                    }
                </Wrapper>
            </>
        );
    }

    return (
        <>
            <Divider smaller/>
            <Wrapper flex around>
                <span className={noProductsMessage}>
                    No products found...
                    <Link to='/shop'>
                        Back to all categories?
                    </Link>
                </span>
            </Wrapper>
        </>
    );
} 

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [canLoadNewPage, setCanLoadNewPage] = useState(true);

    const location = useLocation();
    const { category, subcategory } = queryString.parse(location.search);

    useEffect(() => {
        getProducts({ category, subcategory, page: currentPage })
            .then(loadedProducts => {
                setCanLoadNewPage(loadedProducts.length >= PAGE_SIZE);
                setProducts([...products, ...loadedProducts]);
            })
            .catch(err => console.log(err));
    }, [category, subcategory, currentPage]);
    
    useEffect(() => {
        getProducts({ category, subcategory })
            .then(loadedProducts => {
                setProducts(loadedProducts);
            })
            .catch(err => console.log(err));
    }, [category, subcategory]);

    const loadNextPage = () => {
        if (canLoadNewPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <PageLayout>
            <Divider smaller/>
            <Wrapper>
                <div className={shop}>
                    <aside>
                        <SubcategoryList defaultCategory={category}/>
                    </aside>
                    <main>
                        <ProductsView
                            products={products}
                            canLoadNewPage={canLoadNewPage}
                            loadNextPage={loadNextPage}/>
                    </main>
                </div>
            </Wrapper>
            <Divider/>
        </PageLayout>
    )
}

export default Shop
