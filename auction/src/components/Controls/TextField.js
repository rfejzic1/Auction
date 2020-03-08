import React from 'react'
import classNames from 'classnames';

const TextField = ({ password, fullWidth, className, ...props }) => {
    const type = password ? 'password' : 'text';
    const classes = classNames(
        'text-field',
        { 'full-width': fullWidth },
        className
    );

    return (
        <input className={classes} type={type} {...props} />
    )
}

export default TextField;
