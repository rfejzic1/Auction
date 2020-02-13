import React from 'react'

const Label = props => {
    const { isFor, label } = props;
    return (
        <label className='label' htmlFor={isFor}>{label}</label>
    )
}

export default Label;
