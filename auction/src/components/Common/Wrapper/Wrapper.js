import React from 'react'
import classNames from 'classnames';

import {
    wrapper,
    flex as flexClass,
    flexAround,
    flexNormal
} from './Wrapper.module.scss';

const Wrapper = ({ children, flex, around, normal }) => {
    const classes = classNames(
        wrapper,
        { [flexClass]: flex },
        { [flexAround]: around },
        { [flexNormal]: normal }
    );

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Wrapper;
