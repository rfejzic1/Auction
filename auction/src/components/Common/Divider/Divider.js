import React from 'react'
import classNames from 'classnames';

import { divider, dividerSmaller } from './Divider.module.scss';

const Divider = ({ smaller }) => {
    const classes = classNames(
        divider,
        { [dividerSmaller]: smaller }
    )

    return (
        <hr className={classes} />
    )
}

export default Divider
