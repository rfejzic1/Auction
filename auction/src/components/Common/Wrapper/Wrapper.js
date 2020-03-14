import React from 'react'
import classNames from 'classnames';

const Wrapper = ({ children, flex, around, normal }) => {
    const classes = classNames(
        'wrapper',
        { 'flex': flex },
        { 'flex-around': around },
        { 'flex-normal': normal }
    );

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Wrapper;
