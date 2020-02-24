import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import config from '../../config';

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

const ListSubitem = ({ subcategory }) => {
    return <Link to={`/shop?subcategory=${subcategory.name}`} >{subcategory.name}</Link>;
};

const ListItem = ({ category, isOpen }) => {
    const [open, setOpen] = useState(isOpen);
    const { subcategories } = category;

    const classes = classNames(
        'subcategories',
        { 'open': open }
    );

    const handleSetOpen = () => setOpen(!open);

    return (
        <>
        <span className='item-header' onClick={handleSetOpen}>{category.name}</span>
        <ul className={classes}>
            {
                subcategories.map((subcategory, index) => {
                    return <ListSubitem key={index} subcategory={subcategory}/>
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
        <ul className='categories'>
            <span className='categories-header'>Categories</span>
            {
                categories.map((category, index) => {
                    return <ListItem key={index} isOpen={defaultCategory === category.name} category={category}/>;
                })
            }
        </ul>
    );
}

export default SubcategoryList;
