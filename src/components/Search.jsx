import React from 'react'
//code for searchbar
function Search({search, setSearch}) {
  return (
    <input
        type='text'
        onChange={(e)=>setSearch(e.target.value)}
        value = {search}
        className='search-bar'
        placeholder='Search a pokemon..'
    />
  )
}

export default Search