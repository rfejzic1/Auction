import React, { useState } from 'react';

import { Label, NumberField, Button } from '../../Common';

import {
    block,
    header,
    rangeInput
} from './PriceFilter.module.scss';

const PriceInputField = ({ name, label, onChange }) => {

    const handleChange = e => {
        onChange(e.target.value);
    };

    return (
        <div className={rangeInput}>
            <Label isFor={name} label={label}/>
            <NumberField onChange={handleChange} type="number" name={name}/>
        </div>
    );
};

const PriceFilter = ({ onFilter }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10);

    const handleOnFilter = () => {
        if (onFilter) {
            onFilter(minPrice, maxPrice);
        }
    };

    const onMinPriceChange = value => setMinPrice(value);
    const onMaxPriceChange = value => setMaxPrice(value);

    return (
        <div className={block}>
            <p className={header}>Filter by Price</p>
            <PriceInputField onChange={onMinPriceChange} name="minPrice" label="Min Price" />
            <PriceInputField onChange={onMaxPriceChange} name="maxPrice" label="Max Price" />
            <Button 
                onClick={handleOnFilter}
                text="Filter"
                outline='none'
                fill='primary'
                />
        </div>
    );
}

export default PriceFilter;
