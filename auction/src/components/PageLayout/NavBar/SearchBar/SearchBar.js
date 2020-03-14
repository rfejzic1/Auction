import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { TextField } from '../../../Common';

import { searchBar, searchField } from './SearchBar.module.scss';

const SearchBar = ({ name, placeholder, handleSearch }) => {
    const onSearch = e => {
        if (e.key === 'Enter' && e.target.value) {
            handleSearch(e.target.value);
        }
    }
    
    return (
        <div className={searchBar}>
            <TextField onKeyPress={onSearch} name={name} placeholder={placeholder} className={searchField}/>
            <FontAwesomeIcon onClick={onSearch} icon={faSearch} />
        </div>
    )
}

export default SearchBar;
