import React from "react";
import { POKEMON_TYPES } from "../types";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  selectedType,
  setSelectedType,
}) => (
  <div className="max-w-2xl mx-auto mb-8">
    <div className="flex gap-2 items-center">
      <label htmlFor="search" className="">
        Rechercher un Pokémon
      </label>
      <input
        id="search"
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
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Rechercher
      </button>
    </div>
  </div>
);

export default SearchBar;
