import React from 'react'
import classNames from 'classnames';

import {
    button as buttonClass,
    fillLight as fillLightClass,
    fillPrimary as fillPrimaryClass,
    fillGmail as fillGmailClass,
    fillFacebook as fillFacebookClass,
    fillDark as fillDarkClass,
    outlineNone as outlineNoneClass,
    outlineGray as outlineGrayClass,
    outlinePrimary as outlinePrimaryClass,
    fullWidth as fullWidthClass,
    fat as fatClass,
    strong as strongClass
} from './Button.module.scss';

const Button = ({ children, outline, fill, fat, strong, fullWidth, onClick, className }) => {
    const classes = classNames(
        buttonClass,
        { [fillLightClass]: fill === 'light' },
        { [fillPrimaryClass]: fill === 'primary' },
        { [fillGmailClass]: fill === 'gmail' },
        { [fillFacebookClass]: fill === 'facebook' },
        { [fillDarkClass]: fill === 'dark' },
        { [outlineNoneClass]: outline === 'none' },
        { [outlineGrayClass]: outline === 'gray' },
        { [outlinePrimaryClass]: outline === 'primary' },
        { [fatClass]: fat },
        { [strongClass]: strong },
        { [fullWidthClass]: fullWidth },
        className
    );

    return (
        <button onClick={onClick} className={classes} type="button" >
            {children}
        </button>
    )
}

export default Button;
