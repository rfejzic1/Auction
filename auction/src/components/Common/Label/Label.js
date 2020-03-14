import React from 'react'

import { label as labelClass } from './Label.module.scss';

const Label = props => {
    const { isFor, label } = props;
    return (
        <label className={labelClass} htmlFor={isFor}>{label}</label>
    );
}

export default Label;
