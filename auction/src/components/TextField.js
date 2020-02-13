import React from 'react'
import classNames from 'classnames';

const TextField = props => {
    const { placeholder, name, password, fullWidth, onChange } = props;
    const type = password ? 'password' : 'text';
    const classes = classNames('text-field', {'full-width': fullWidth});

    return (
        <input onChange={onChange} className={classes} type={type} name={name} placeholder={placeholder} />
    )
}

export default TextField;
