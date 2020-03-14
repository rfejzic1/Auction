import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import config from '../../../../config';

import {
    categories as categoriesClass,
    categoriesHeader
} from './CategoryList.module.scss';

const getCategories = async setCategories => {
    try {
        const res = await axios({
            baseURL: config.API_URL,
            url: '/categories'
        });
        setCategories(res.data);
    } catch {
        setCategories([]);
    }
};

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories(setCategories);
    }, []);

    return (
        <ul className={categoriesClass}>
            <span className={categoriesHeader}>Categories</span>
            {
                categories.map((category, index) => {
                    return <Link key={index} to={`/shop?category=${category.name}`} >{category.name}</Link>;
                })
            }
            <Link to={`/categories`}>All Categories</Link>
        </ul>
    );
}

export default CategoryList;
