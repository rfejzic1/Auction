import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import { faTh, faList } from '@fortawesome/free-solid-svg-icons';

import { Wrapper, Grid, Divider, Button, SelectField } from '../Common';
import PageLayout from '../PageLayout'
import SubcategoryList from './SubcategoryList';
import ProductCard from './ProductCard';
import PriceFilter from './PriceFilter';

import config from '../../config';

import { 
    shop,
    noProductsMessage,
    viewBar as viewBarClass
} from './Shop.module.scss';
import ProductListItem from './ProductListItem/ProductListItem';

const PAGE_SIZE = 9;

const getProducts = async ({ category, subcategory, page, orderBy, minPrice, maxPrice }) => {
    try {    
        const res = await axios({
            baseURL: config.API_URL,
            url: `/products`,
            params: {
                category,
                subcategory,
                page,
                size: PAGE_SIZE,
                orderBy,
                minPrice,
                maxPrice
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
    const [currentPage, setCurrentPage] = useState(0);
    const [canLoadNewPage, setCanLoadNewPage] = useState(true);
    const [orderBy, setOrderBy] = useState('');
    const [isListView, setIsListView] = useState(false);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const location = useLocation();
    const { category, subcategory } = queryString.parse(location.search);

    useEffect(() => {
        getProducts({ category, subcategory, page: currentPage, orderBy, minPrice, maxPrice })
            .then(loadedProducts => {
                setCanLoadNewPage(loadedProducts.length >= PAGE_SIZE);
                setProducts([...loadedProducts]);
                setCurrentPage(0);
            })
            .catch(err => console.log(err));
    }, [category, subcategory, orderBy, minPrice, maxPrice]);

    useEffect(() => {
        getProducts({ category, subcategory, page: currentPage, orderBy, minPrice, maxPrice })
            .then(loadedProducts => {
                setCanLoadNewPage(loadedProducts.length >= PAGE_SIZE);
                if(currentPage === 0) {
                    setProducts([...loadedProducts]);
                } else {
                    setProducts([...products, ...loadedProducts]);
                }
            })
            .catch(err => console.log(err));
    }, [currentPage]);

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleOrderByChange = ({ value }) => {
        setOrderBy(value);
    };

    const handleViewChange = listView => {
        setIsListView(listView);
    }

    const handlePriceFilter = (minPrice, maxPrice) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    return (
        <PageLayout>
            <Divider smaller/>
            <Wrapper>
                <div className={shop}>
                    <aside>
                        <SubcategoryList defaultCategory={category}/>
                        <PriceFilter onFilter={handlePriceFilter}/>
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
