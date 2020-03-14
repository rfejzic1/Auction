import React from 'react'
import classNames from 'classnames';

const Divider = ({ smaller }) => {
    const classes = classNames(
        'divider',
        { 'divider-smaller': smaller }
    )

    return (
        <hr className={classes} />
    )
}

export default Divider
