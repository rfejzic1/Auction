import React from 'react'
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Button from '../Controls/Button';

const BidButton = ({ product, className }) => {
    const history = useHistory();
    const classes = classNames(
        className,
    );

    const handleClick = () => {
        const url = `/shop/${product.uuid}`;
        history.push(url);
    };

    return (
        <Button onClick={handleClick} className={classes} >
            Bid Now
            <FontAwesomeIcon icon={faChevronRight} />
        </Button>
    )
}

export default BidButton;
