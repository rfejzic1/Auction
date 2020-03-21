import React from 'react'
import classNames from 'classnames';

import { textField, fullWidth as fullWidthClass } from './TextField.module.scss';

const TextField = ({ password, fullWidth, className, ...props }) => {
    const type = password ? 'password' : 'text';
    const classes = classNames(
        textField,
        { [fullWidthClass]: fullWidth },
        className
    );

    return (
        <input className={classes} type={type} {...props} />
    )
}

export default TextField;
