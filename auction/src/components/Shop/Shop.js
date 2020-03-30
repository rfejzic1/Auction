import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import { Wrapper, Grid, Divider, Button, SelectField } from '../Common';
import PageLayout from '../PageLayout'
import SubcategoryList from './SubcategoryList';
import ProductCard from './ProductCard';

import config from '../../config';

import { 
    shop,
    noProductsMessage,
    viewBar as viewBarClass
} from './Shop.module.scss';
import ProductListItem from './ProductListItem/ProductListItem';

const PAGE_SIZE = 9;

// FIX LOADING ERROR.....

const getProducts = async ({ category, subcategory, page, orderBy }) => {
    try {    
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products`,
            params: {
                category,
                subcategory,
                page,
                size: PAGE_SIZE,
                orderBy
            }
        })
        return res.data;
    } catch (err) {
        return [];
    }
};

const ViewBar = ({ onOrderByChange }) => {
    const orderByOptions = [
        {
            name: 'Sort by name',
            value: 'NAME'
        },
        {
            name: 'Sort by newness',
            value: 'NEWEST'
        },
        {
            name: 'Sort by price',
            value: 'PRICE_LOWEST'
        }
    ];
    
    return (
        <div className={viewBarClass}>
            <SelectField options={orderByOptions} onChange={onOrderByChange}/>

        </div>
    );
}

const ProductsView = ({ products, canLoadNewPage, loadNextPage, listView }) => {
    if (products.length > 0) {
        return (
            <>
                <Grid list={listView}>
                    {products.map((product, index) => {
                        return listView ? 
                        <ProductListItem key={index} product={product} />
                        :
                        <ProductCard key={index} product={product} />
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
    const [orderBy, setOrderBy] = useState('');

    const location = useLocation();
    const { category, subcategory } = queryString.parse(location.search);

    useEffect(() => {
        getProducts({ category, subcategory, page: currentPage, orderBy })
            .then(loadedProducts => {
                setCanLoadNewPage(loadedProducts.length >= PAGE_SIZE);
                setProducts([...loadedProducts]);
            })
            .catch(err => console.log(err));
    }, [category, subcategory, currentPage, orderBy]);

    const loadNextPage = () => {
        if (canLoadNewPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleOrderByChange = ({ value }) => {
        setOrderBy(value);
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
                        <ViewBar onOrderByChange={handleOrderByChange}/>
                        <ProductsView
                            listView
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
