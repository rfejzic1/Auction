import React from 'react'
import classNames from 'classnames';

// With icon left/right
// Solid gray/purple
// With outline gray/purple filled white/
// uppercase


const Button = props => {
    const { type, fullWidth } = props;
    const classes = classNames(
        'button',
        {'btn-primary': type === 'primary'},
        {'btn-gmail': type === 'gmail'},
        {'btn-facebook': type === 'facebook'},
        {'full-width': fullWidth}
    );

    return (
        <button className={classes} type="button" >
            {props.children}
        </button>
    )
}

export default Button;
