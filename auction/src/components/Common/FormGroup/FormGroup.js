import React from 'react'
import classNames from 'classnames';

const FormGroup = ({ children, flex, around }) => {
    const classes = classNames(
        'form-group',
        { 'flex': flex },
        { 'flex-around': around }
    )
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default FormGroup;
