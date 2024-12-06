import React, { useState } from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { onLoadMorePokemons, onPokemonSearch } from "./Pokedex.telefunc.js";
import { POKEMON_TYPES } from "./types";
export default function Page() {
  const initialPokemons = useData<Data>();
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(30); // suivre la page

  const handleSearch = async () => {
    console.log("clicked");
    if (searchTerm.trim() === "" && !selectedType) {
      setPokemons(initialPokemons);
      return;
    }
    setIsLoading(true);
    try {
      const searchResults = await onPokemonSearch({
        searchTerm: searchTerm.trim(),
        type: selectedType,
      });

      setPokemons(searchResults);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePokemons = async () => {
    setIsLoading(true);
    try {
      const newPokemons = await onLoadMorePokemons(offset);
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      setOffset((prevOffset) => prevOffset + 30);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      {/* Barre de recherche */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              handleSearch();
            }}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les types</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? "..." : "Rechercher"}
          </button>
        </div>
      </div>

      {/* Conteneur Flex pour les cartes Pokémon */}
      <div className="flex flex-wrap justify-center gap-4">
        {pokemons.map((pokemon) => (
          <a
            key={pokemon.id}
            href={`/pokedex/${pokemon.slug}`}
            className="w-48 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 text-center hover:scale-105 transform"
          >
            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
              {pokemon.sprites && (
                <img
                  src={pokemon.sprites.normal.male || ""}
                  alt={pokemon.name}
                  className="object-contain w-full h-full p-2"
                />
              )}
            </div>
            <h2 className="font-semibold text-lg text-gray-800">
              {pokemon.name}
            </h2>
            <p className="text-sm text-gray-500">#{pokemon.id}</p>
          </a>
        ))}
      </div>
      {/* Bouton Charger plus */}
      <div className="flex justify-center mt-8">
        <button
          onClick={loadMorePokemons}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300"
        >
          {isLoading ? "Chargement..." : "Charger plus..."}
        </button>
      </div>
      <p className="text-center mt-8 text-gray-600">
        Source:{" "}
        <a
          href="https://pokedex.coda.memento-dev.fr"
          className="text-blue-500 hover:underline"
        >
          pokedex.coda.memento-dev.fr
        </a>
      </p>
    </div>
  );
}
