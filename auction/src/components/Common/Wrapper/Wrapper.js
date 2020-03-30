import React from 'react'
import classNames from 'classnames';

import {
    wrapper,
    flex as flexClass,
    flexAround,
    flexNormal,
    noPadding as noPaddingClass
} from './Wrapper.module.scss';

const Wrapper = ({ children, flex, around, normal, noPadding }) => {
    const classes = classNames(
        wrapper,
        { [flexClass]: flex },
        { [flexAround]: around },
        { [flexNormal]: normal },
        { [noPaddingClass]: noPadding }
    );

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Wrapper;
