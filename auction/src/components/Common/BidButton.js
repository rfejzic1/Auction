import React from 'react'
import { useHistory } from 'react-router-dom';

import { faChevronRight, faGavel } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const BidButton = ({ text, hammer, product, onClick, ...props }) => {
    const history = useHistory();

    const handleClick = () => {
        const url = `/shop/${product.uuid}`;
        history.push(url);
    };

    return (
        <Button 
            {...props}
            onClick={onClick || handleClick}
            iconRight={hammer ? faGavel : faChevronRight}
            text={text}
        />
    )
}

export default BidButton;
