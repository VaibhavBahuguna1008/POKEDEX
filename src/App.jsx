import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import Search from './components/Search'
import Filter from './components/Filter'
import Card from './components/Card'

function App() {
  //states
  const [type, settype] = useState('')
  const [search, setSearch] = useState('');
  const [filtererdList, setfiltererdList] = useState([])
  const [pokemonList, setpokemonList] = useState([])
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  //fetch logic
  useEffect(()=>{
    const fetchPokemon = async () => {
      try {
        //fetching response by setting limit to 150
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemondata = await Promise.all(
          response.data.results.map(async (pokemon)=> {
            const details = await axios.get(pokemon.url)
            return{
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default || details.data.sprites.other['official-artwork'].front_default,
              types:  details.data.types.map(t => t.type.name)
            }
          })
        )
        setloading(false)
        setpokemonList(pokemondata);
        setfiltererdList(pokemondata);
        console.log(pokemondata)

      } catch (error) {
        setError('Failed fetching pokemon data')
        setloading(false)
      }
    }
    fetchPokemon()
  },[])

  //filter the list types and name
  useEffect(()=>{
    let list = pokemonList;
    if(search){
      list = list.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(type){
      list = list.filter(pokemon => pokemon.types.includes(type));
    }
    setfiltererdList(list)
  }, [search, pokemonList, type])
  return (
    <div className='App'>
      <Header/>
      <div className='controls'>
        <Search search={search} setSearch={setSearch}/>
        <Filter setType={settype}/>
      </div>
      {loading && <p>Loading Pokémon...</p>}
      {error && <p>{error}</p>}
      {!loading && filtererdList.length === 0 && <p>No Pokémon found.</p>}
      <div className='pokemon-list'>
        {filtererdList.map((pokemon)=>(
          <Card pokemon={pokemon} key={pokemon.id}/>
        ))}
      </div>
      
    </div>
  )
}

export default App
