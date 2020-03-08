import React from 'react'
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faGavel } from '@fortawesome/free-solid-svg-icons';

import Button from '../Controls/Button';

const BidButton = ({ text, hammer, product, onClick, ...props }) => {
    const history = useHistory();

    const handleClick = () => {
        const url = `/shop/${product.uuid}`;
        history.push(url);
    };

    return (
        <Button {...props} onClick={onClick || handleClick}>
            {text}
            <FontAwesomeIcon className='icon-right' icon={hammer ? faGavel : faChevronRight} />
        </Button>
    )
}

export default BidButton;
