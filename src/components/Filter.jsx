import React from 'react'

const types = ["", "fire", "water", "grass", "electric", "bug", "normal", "poison", "ground", "fairy", "fighting", "psychic", "rock", "ghost", "dragon", "ice", "dark", "steel", "flying"];

function Filter({setType}) {
  return (
    <select 
        className='type-filter'
        onChange={(e)=>setType(e.target.value)}
    >
        <option value="">
            All types
        </option>
        {
            types.map((type)=>
            (
                <option
                    key={type}
                    value={type}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
            )
            )
        }
    </select>
  )
}

export default Filter