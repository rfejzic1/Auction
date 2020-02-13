import React from 'react'
import classNames from 'classnames';

const SelectField = props => {
    const { name, id, options, fullWidth, onChange } = props;
    const classes = classNames('select-field', {'full-width': fullWidth});

    return (
        <select onChange={onChange} className={classes} name={name} id={id}>
            {options.map((option, index) => <option value={index}>{option}</option>)}
        </select>
    )
}

export default SelectField;
