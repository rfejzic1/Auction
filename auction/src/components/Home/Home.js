import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { Divider, Wrapper } from '../Common';
import Jumbotron from './Jumbotron';
import PageLayout from '../PageLayout';
import ProductCard from '../Shop/ProductCard';

import config from '../../config';

import {
    tiledGallery,
    cols4 as cols4Class,
    header,
    homeSection,
    tab,
    active as activeClass
} from './Home.module.scss';

const getProducts = async setProducts => {
    try {
        const res = await axios({
            baseURL: config.API_URL,
            url: '/products'
        });
        setProducts(res.data);
    } catch (err) {
        console.log(err);
    }
};

const TiledGallery = ({ products, cols4, limit }) => {
    const bodyClasses = classNames(
        tiledGallery,
        { [cols4Class]: cols4 }
    );

    products = products.filter((_, index) => index < limit);

    return (
        <div className={bodyClasses}>
            {
                products.map((product, index) => <ProductCard key={index} product={product} />)
            }
        </div>
    );
};

const Section = ({ title, products, limit, cols4 }) => {
    return (
        <div className={homeSection}>
            <div className={header}>
                {title}
            </div>
            <hr/>
            <TiledGallery products={products} limit={limit} cols4={cols4} />
        </div>
    );
};

const TabbedSection = ({ tabsData, limit, cols4 }) => {
    const [currentTab, setCurrentTab] = useState(Object.keys(tabsData)[0]);

    const classes = active => classNames(
        tab,
        { [activeClass]: active }
    );

    const tabs = Object.keys(tabsData).map((tabName, index) => {
        return (
            <span
                key={index}
                onClick={() => setCurrentTab(tabName)}
                className={classes(tabName === currentTab)}>
                    {tabName}
            </span>
        );
    });

    return (
        <div className={homeSection}>
            <div>
                {tabs}
            </div>
            <hr/>
            <TiledGallery products={tabsData[currentTab]} limit={limit} cols4={cols4} />
        </div>
    );
};


const Home = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts(setProducts);
    }, []);

    const milisToDays = milis => milis / (1000 * 60 * 60 * 24);

    const filterNewArrivals = products => {
        const now = Date.now();
        return products.filter(product => milisToDays(now - product.startDate) <= 2);
    };

    const filterLastChanceProducts = products => {
        const now = Date.now();
        return products.filter(product => milisToDays(product.endDate - now) <= 2);
    };

    if (products && products.length > 0) {
        return (
            <PageLayout>
                <Jumbotron product={products[0]} />
                <Wrapper>
                    <Section title='Feature Collection' products={products} limit={3} />
                    <Divider />
                    <Section title='Feature Products' cols4 products={products} limit={4} />
                    <Divider />
                    <TabbedSection
                        cols4
                        limit={4}
                        tabsData={{
                            'New Arrivals': filterNewArrivals(products),
                            'Last Chance': filterLastChanceProducts(products)
                        }}
                    />
                </Wrapper>
                <Divider/>
            </PageLayout>
        );
    }

    return null;
}

export default Home;
