import React from 'react';

import Wrapper from '../Common/Wrapper';
import CategoryList from './CategoryList';

const Jumbotron = () => {
    return (
        <div className="jumbotron">
            <Wrapper>
                <CategoryList/>
            </Wrapper>
        </div>
    );
}

export default Jumbotron;
