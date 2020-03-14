import React from 'react'
import classNames from 'classnames';

import {
    button as buttonClass,
    btnPrimary,
    btnGmail,
    btnFacebook,
    fullWidth as fullWidthClass
} from './Button.module.scss';

const Button = props => {
    const { type, fullWidth, onClick, className } = props;
    const classes = classNames(
        buttonClass,
        { [btnPrimary]: type === 'primary' },
        { [btnGmail]: type === 'gmail' },
        { [btnFacebook]: type === 'facebook' },
        { [fullWidthClass]: fullWidth },
        className
    );

    return (
        <button onClick={onClick} className={classes} type="button" >
            {props.children}
        </button>
    )
}

export default Button;
