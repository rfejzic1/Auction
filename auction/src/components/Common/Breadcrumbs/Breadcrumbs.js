import React from 'react'
import Wrapper from '../Wrapper';

import {
    breadcrumbsBar,
    current as currentClass
} from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ current, path }) => {
    return (
        <div className={breadcrumbsBar}>
            <Wrapper flex>
                <h2>{current}</h2>
                {path ? <span>{path} <span className={currentClass}>{current}</span></span> : ''}
            </Wrapper>
        </div>
    );
}

export default Breadcrumbs;
