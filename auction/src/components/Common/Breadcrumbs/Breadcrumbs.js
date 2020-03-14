import React from 'react'
import Wrapper from '../Wrapper';

const Breadcrumbs = props => {
    const { current, path } = props;
    return (
        <div className="breadcrumbs-bar">
            <Wrapper flex>
                <h2>{current}</h2>
                {path ? <span>{path} <span className='current'>{current}</span></span> : ''}
            </Wrapper>
        </div>
    )
}

export default Breadcrumbs;
