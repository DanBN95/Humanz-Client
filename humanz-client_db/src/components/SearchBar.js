import React, { useState } from 'react'

function SearchBar(props) {

    const { findUsersByFilter } = props;
    const [filter, setFilter] = useState();

  return (
    <>
        <input 
        className='search-bar-input' 
        placeholder={`{ "field": "value" }`}
        value={filter}
        onChange={(e) => {e.preventDefault(); setFilter(e.target.value)}}
        />
        <button 
        className='button button-search' 
        title={"Search"} 
        onClick={() => {
            findUsersByFilter(filter)
            setFilter('')}}>
                Find
        </button>     

    </>

  )
}

export default SearchBar