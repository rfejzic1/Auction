import React from 'react'
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    strong as strongClass,
    iconRight as iconRightClass,
    iconLeft as iconLeftClass
} from './Button.module.scss';

const Button = props => {
    const {
        outline,
        fill,
        fat,
        strong,
        fullWidth,
        className,
        text,
        iconLeft,
        iconRight,
        onClick
    } = props;

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
            {iconLeft && <FontAwesomeIcon className={iconLeftClass} icon={iconLeft}/>}
            {text}
            {iconRight && <FontAwesomeIcon className={iconRightClass} icon={iconRight}/>}
        </button>
    )
}

export default Button;
