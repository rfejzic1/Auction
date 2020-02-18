import React from 'react'

const Container = props => {
    const { title, children } = props;
    return (
        <div className='container'>
            <div className='container-header'>
                <h2>{title}</h2>
            </div>
            <div className='container-body'>{children}</div>
        </div>
    )
}

export default Container;
