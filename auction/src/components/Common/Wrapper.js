import React from 'react'
import classNames from 'classnames';

const Wrapper = ({ children, flex, around }) => {
    const classes = classNames(
        'wrapper',
        { 'flex': flex },
        { 'flex-around': around }
    );

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Wrapper;
