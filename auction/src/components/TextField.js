import React from 'react'
import classNames from 'classnames';

const TextField = props => {
    const { placeholder, name, password, fullWidth } = props;
    const type = password ? 'password' : 'text';
    const classes = classNames('text-field', {'full-width': fullWidth});

    return (
        <div>
            <input className={classes} type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

export default TextField;
