import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';

import TextField from '../../../Common/TextField/TextField';

const SearchBar = ({ name, placeholder, handleSearch }) => {
    const onSearch = e => {
        if (e.key === 'Enter' && e.target.value) {
            handleSearch(e.target.value);
        }
    }
    
    return (
        <div className="search-bar">
            <TextField onKeyPress={onSearch} name={name} placeholder={placeholder} className='search-field'/>
            <FontAwesomeIcon onClick={onSearch} icon={faSearch} />
        </div>
    )
}

export default SearchBar;
