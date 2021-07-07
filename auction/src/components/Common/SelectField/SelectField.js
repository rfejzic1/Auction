import React from 'react'
import classNames from 'classnames';

import { selectField, fullWidth as fullWidthClass } from './SelectField.module.scss';

const SelectField = props => {
    const { name, id, options, fullWidth, onChange } = props;
    const classes = classNames(
        selectField,
        { [fullWidthClass]: fullWidth }
    );

    const handleOnChange = e => {
        const { value, text } = e.target.options[e.target.selectedIndex];
        onChange({
            value, text
        });
    };

    return (
        <select onChange={handleOnChange} className={classes} name={name} id={id}>
            { options.map((option, index) => {
                return <option key={index} value={option.value}>{option.name}</option>
            })}
        </select>
    )
}

export default SelectField;
