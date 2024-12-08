import { useState } from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { onLoadMorePokemons, onPokemonSearch } from "./Pokedex.telefunc.js";
import { POKEMON_TYPES, Pokemon } from "./types";
import SearchBar from "./components/SearchBar.jsx";
import PokemonCards from "./components/PokemonCards.jsx";
import LoadMoreButton from "./components/LoadMoreButton.jsx";

export default function Page() {
  //Donnees initiales des pokemons
  const initialPokemons = useData<Data>();
  //pokemons affichés
  const [pokemons, setPokemons] = useState(initialPokemons);
  //Search Bar
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  //Loading
  const [isLoading, setIsLoading] = useState(false);
  // offset pour charger les autres pokemons
  const [offset, setOffset] = useState(30);
  const [isSearching, setIsSearching] = useState(false);

  //Fonction recherche des pokemons
  const handleSearch = async () => {
    
    if (searchTerm.trim() === "" && !selectedType) {
      setPokemons(initialPokemons);
      setIsSearching(false);
      return;
    }
    setIsLoading(true);
    setIsSearching(true);
    try {
      // appel a l'api
      const searchResults = await onPokemonSearch({
        searchTerm: searchTerm.trim(),
        type: selectedType,
      });
      //Filtrage des resultats pour ne prendre que les lettres concordant avec le nom et non pas le slug
      const filteredResults = searchResults.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      // MAJ des okemons affichés
      setPokemons(filteredResults);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  //Fonction pour charger plus de pokemons
  const loadMorePokemons = async () => {
    setIsLoading(true);
    try {
      // appel a l'api
      const newPokemons = await onLoadMorePokemons(
        offset,
        selectedType,
        searchTerm.trim()
      );
      // MAJ des pokemons affichés
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
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <PokemonCards pokemons={pokemons} />
      <LoadMoreButton
        loadMorePokemons={loadMorePokemons}
        isLoading={isLoading}
        isSearching={isSearching}
      />
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
