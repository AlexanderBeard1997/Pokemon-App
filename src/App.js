import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [randomPokemon, setRandomPokemon] = useState({
    name: ``,
    image: ``,
    description: ``,
  })
  const [searchPokemonName, setSearchPokemonName] = useState(``)
  const [searchedPokemon, setSearchedPokemon] = useState(null)

  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  const fetchRandomPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      const data = await response.json()
      const pokemonList = data.results
      const randomNum = Math.floor(Math.random() * pokemonList.length)
      const randomPokemonName = pokemonList[randomNum].name
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemonName}`)
      const pokemonData = await pokemon.json()
      const pokemonDescription = pokemonData.flavor_text_entries.find(entry => entry.language.name === `en`).flavor_text
      const randomPokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNum + 1}.png`

      setRandomPokemon({
        name: randomPokemonName,
        image: randomPokemonImg,
        description: pokemonDescription,
      })
    } catch (error) {
      alert(`Error fetching random Pokemon`, error)
    }
  }

  const searchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemonName.toLowerCase()}`)
      if (!response.ok) {
        throw new Error('Pokémon not found')
      }

      const data = await response.json()
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`)
      const pokemonData = await pokemon.json()
      const pokemonDescription = pokemonData.flavor_text_entries.find(entry => entry.language.name === `en`).flavor_text
      const searchedPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`

      setSearchedPokemon({
        name: data.name,
        image: searchedPokemonImage,
        description: pokemonDescription,
      })
    } catch (error) {
      alert(`Error searching for Pokemon:`, error)
      setSearchedPokemon(null)
    }
  }

  const clearSearch = () => {
    setSearchedPokemon(null)
    setSearchPokemonName(``)
    setRandomPokemon({
      name: ``,
      image: ``,
      description: ``,
    })
  }

  return (
    <div className="App">
      <h1>Random Pokemon</h1>
      <button onClick={fetchRandomPokemon}>Get random Pokemon</button>

      <div>
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={searchPokemonName}
          onChange={(e) => setSearchPokemonName(e.target.value)}
        />
        <button onClick={searchPokemon}>Search</button>
        <button onClick={clearSearch}>Clear</button>
      </div>

      {searchedPokemon && (
        <div>
          <h1>Name: {searchedPokemon.name}</h1>
          <h2>Description: {searchedPokemon.description}</h2>
          {searchedPokemon.image && (
            <img
              src={searchedPokemon.image}
              alt={searchedPokemon.name}
              style={{ width: `300px` }}
            />
          )}
        </div>
      )}

      {!searchedPokemon && (
        <div>
          <h1>Name: {randomPokemon.name}</h1>
          <h2>Description: {randomPokemon.description}</h2>
          {randomPokemon.image && (
            <img
              src={randomPokemon.image}
              alt={randomPokemon.name}
              style={{ width: `300px` }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App
