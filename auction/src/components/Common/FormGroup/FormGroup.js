import React from 'react'
import classNames from 'classnames';

import { formGroup, flex as flexClass, flexAround } from './FormGroup.module.scss';

const FormGroup = ({ children, flex, around }) => {
    const classes = classNames(
        formGroup,
        { [flexClass]: flex },
        { [flexAround]: around }
    );
    
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default FormGroup;
