import React from 'react'

function Card({pokemon}) {
  return (
    <div className='pokemon-card'>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>Id:{pokemon.id}</p>
        <div>
            {pokemon.types.map(type=>(
                <span key={type} className={type}>{type}</span>
            ))}
        </div>
    </div>
  )
}

export default Card