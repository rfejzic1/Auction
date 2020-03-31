import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import { faTh, faList } from '@fortawesome/free-solid-svg-icons';

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

const ViewBar = ({ onOrderByChange, onViewChange }) => {
    const [viewList, setViewList] = useState(false);

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
    
    const handleViewButton = isListView => {
        setViewList(isListView);
        onViewChange(isListView);
    }

    const buttonBackgroundFill = isListView => isListView ? 'primary' : 'light';

    return (
        <div className={viewBarClass}>
            <SelectField options={orderByOptions} onChange={onOrderByChange}/>
            <span>
                <Button 
                    onClick={() => handleViewButton(false)}
                    text='Grid' iconRight={faTh}
                    fill={buttonBackgroundFill(!viewList)}
                    outline='none'
                    />
                <Button
                    onClick={() => handleViewButton(true)}
                    text='List' iconRight={faList}
                    fill={buttonBackgroundFill(viewList)}
                    outline='none'
                    />
            </span>
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
    const [isListView, setIsListView] = useState(false);
    const canLoadNewPage = false;

    const location = useLocation();
    const { category, subcategory } = queryString.parseUrl(location.search);
    
    useEffect(() => {
        getProducts({ category, subcategory })
            .then(loadedProducts => {
                setProducts([...loadedProducts]);
            });
    }, [category, subcategory]);

    const loadNextPage = () => {
        
    };

    const handleOrderByChange = ({ value }) => {
        const orderFunctions = {
            'NAME': (a, b) => a.name.localeCompare(b.name),
            'NEWEST': (a, b) => a.startDate - b.startDate,
            'PRICE_LOWEST': (a, b) => a.startPrice - b.startPrice
        };

        const orderedProducts = [...products].sort(orderFunctions[value]);
        setProducts(orderedProducts);
    };

    const handleViewChange = listView => {
        setIsListView(listView);
    }

    return (
        <PageLayout>
            <Divider smaller/>
            <Wrapper>
                <div className={shop}>
                    <aside>
                        <SubcategoryList defaultCategory={category}/>
                    </aside>
                    <main>
                        <ViewBar 
                            onOrderByChange={handleOrderByChange}
                            onViewChange={handleViewChange}
                            />
                        <ProductsView
                            listView={isListView}
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


/*
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [canLoadNewPage, setCanLoadNewPage] = useState(true);
    const [orderBy, setOrderBy] = useState('');
    const [isListView, setIsListView] = useState(false);

    const location = useLocation();
    const { category, subcategory } = queryString.parse(location.search);

    useEffect(() => {
        getProducts({ category, subcategory, page: currentPage, orderBy })
            .then(loadedProducts => {
                setCanLoadNewPage(loadedProducts.length >= PAGE_SIZE);
                setProducts([...products, ...loadedProducts]);
            })
            .catch(err => console.log(err));
    }, [category, subcategory, currentPage, orderBy]);
*/