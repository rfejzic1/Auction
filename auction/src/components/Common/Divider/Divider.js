import React from 'react'
import classNames from 'classnames';

import { 
    divider, 
    dividerSmaller,
    visible as visibleClass
} from './Divider.module.scss';

const Divider = ({ smaller, visible }) => {
    const classes = classNames(
        divider,
        { [dividerSmaller]: smaller },
        { [visibleClass]: visible }
    );

    return (
        <hr className={classes} />
    );
}

export default Divider
