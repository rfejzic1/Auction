import React from 'react'
import { useLocation } from 'react-router-dom';

import PageLayout from './PageLayout'
import Wrapper from './Common/Wrapper';
import SubcategoryList from './Home/SubcategoryList';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Shop = () => {
    const query = useQuery();
    console.log(query.get("category"));
    
    return (
        <PageLayout>
            <Wrapper>
                <SubcategoryList defaultCategory={query.get("category")}/>
            </Wrapper>
        </PageLayout>
    )
}

export default Shop
