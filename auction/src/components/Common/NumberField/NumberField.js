import React from 'react'
import classNames from 'classnames';

import { numberField, fullWidth as fullWidthClass } from './NumberField.module.scss';

const TextField = ({ fullWidth, className, ...props }) => {
    const classes = classNames(
        numberField,
        { [fullWidthClass]: fullWidth },
        className
    );

    return (
        <input className={classes} type="number" {...props} />
    )
}

export default TextField;
