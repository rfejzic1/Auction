import React from 'react'
import classNames from 'classnames';

import {
    formGroup,
    flex as flexClass,
    flexAround,
    marginNone,
    marginSmall,
    marginMedium,
    marginLarge,
    marginLarger
} from './FormGroup.module.scss';

const FormGroup = ({ children, flex, around, margin }) => {
    const classes = classNames(
        formGroup,
        { [flexClass]: flex },
        { [flexAround]: around },
        { [marginNone]: margin === 'none' },
        { [marginSmall]: margin === 'small' },
        { [marginMedium]: margin === 'medium' },
        { [marginLarge]: margin === 'large' },
        { [marginLarger]: margin === 'larger' }
    );
    
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default FormGroup;
