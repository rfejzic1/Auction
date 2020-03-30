import React from 'react'
import classNames from 'classnames';

import { 
    grid,
    list as listClass
} from './Grid.module.scss';

const Grid = ({ children, list }) => {
    const classes = classNames(
        grid,
        { [listClass]: list }
    );

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Grid;
