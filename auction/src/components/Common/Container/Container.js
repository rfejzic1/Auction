import React from 'react';

import {
    container,
    containerHeader,
    containerBody
} from './Container.module.scss';

const Container = props => {
    const { title, children } = props;
    return (
        <div className={container}>
            <div className={containerHeader}>
                <h2>{title}</h2>
            </div>
            <div className={containerBody}>{children}</div>
        </div>
    )
}

export default Container;
