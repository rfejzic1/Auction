import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';

import TextField from '../Controls/TextField';

const SearchBar = props => {
    const { name, placeholder } = props;
    return (
        <div className="search-bar">
            <TextField name={name} placeholder={placeholder} className='search-field'/>
            <FontAwesomeIcon icon={faSearch} />
        </div>
    )
}

export default SearchBar;
