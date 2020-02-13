import React from 'react'

const Label = props => {
    const { isFor, label } = props;
    return (
        <label className='label' for={isFor}>{label}</label>
    )
}

export default Label;
