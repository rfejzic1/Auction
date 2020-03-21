import React from 'react'
import classNames from 'classnames';

import { selectField, fullWidth as fullWidthClass } from './SelectField.module.scss';

const SelectField = props => {
    const { name, id, options, fullWidth, onChange } = props;
    const classes = classNames(
        selectField,
        { [fullWidthClass]: fullWidth }
    );

    return (
        <select onChange={onChange} className={classes} name={name} id={id}>
            { options.map((option, index) => {
                return <option value={index}>{option}</option>
            })}
        </select>
    )
}

export default SelectField;
