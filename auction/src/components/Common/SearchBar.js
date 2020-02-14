import React from 'react'

import TextField from '../Controls/TextField';

const SearchBar = props => {
    const { name, placeholder } = props;
    return (
        <TextField name={name} placeholder={placeholder} className='search-bar'/>
    )
}

export default SearchBar;
