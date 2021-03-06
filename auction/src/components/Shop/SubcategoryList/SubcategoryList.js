import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import {
    categories as categoriesClass,
    categoriesHeader,
    itemHeader,
    open as openClass,
    subcategories as subcategoriesClass
} from './SubcategoryList.module.scss';

import config from '../../../config';

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

const ListSubitem = ({ subcategory, category }) => {
    const url = `/shop?category=${category.name}&subcategory=${subcategory.name}`;
    return <Link to={url} >{subcategory.name}</Link>;
};

const ListItem = ({ category, isOpen }) => {
    const [open, setOpen] = useState(isOpen);
    const { subcategories } = category;

    const classes = classNames(
        subcategoriesClass,
        { [openClass]: open }
    );

    const handleSetOpen = () => setOpen(!open);

    return (
        <>
        <span className={itemHeader} onClick={handleSetOpen}>{category.name}</span>
        <ul className={classes}>
            {
                subcategories.map((subcategory, index) => {
                    return <ListSubitem key={index} subcategory={subcategory} category={category}/>
                })
            }
        </ul>
        </>
    );
};

const SubcategoryList = ({ defaultCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories(setCategories);
    }, []);

    return (
        <ul className={categoriesClass}>
            <span className={categoriesHeader}>Categories</span>
            {
                categories.map((category, index) => {
                    return <ListItem key={index} isOpen={defaultCategory === category.name} category={category}/>;
                })
            }
        </ul>
    );
}

export default SubcategoryList;
