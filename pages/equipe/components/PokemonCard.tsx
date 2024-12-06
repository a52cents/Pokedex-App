// components/PokemonCard.tsx
import type { PokemonCardProps } from "../types/types";
import { useState } from "react";

export const PokemonCard = ({ pokemon, onRemove }: PokemonCardProps) => {
  const sprite = pokemon.isShiny
    ? pokemon.isFemale
      ? pokemon.pokemon.sprites.shiny.female
      : pokemon.pokemon.sprites.shiny.male
    : pokemon.isFemale
    ? pokemon.pokemon.sprites.normal.female
    : pokemon.pokemon.sprites.normal.male;

  return (
    <div className="w-48 h-48 bg-white rounded-xl shadow-lg p-4 relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="h-28 flex items-center justify-center">
        <img
          src={sprite || ""}
          alt={pokemon.pokemon.name}
          className="h-full object-contain"
        />
      </div>
      <div className="text-center mt-2">
        <div className="font-semibold">{pokemon.pokemon.name}</div>
        <div className="text-sm text-gray-500">
          Position {pokemon.position + 1}
        </div>
      </div>
    </div>
  );
};
