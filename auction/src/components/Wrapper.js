import React from 'react'
import classNames from 'classnames';

const Wrapper = props => {
    const classes = classNames(
        'wrapper',
        {'wrapper-flex': props.flex}
    );

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

export default Wrapper;
