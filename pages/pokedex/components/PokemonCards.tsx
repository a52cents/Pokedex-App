import React from "react";
import { Pokemon } from "../types";

interface PokemonCardsProps {
  pokemons: Pokemon[];
}

const PokemonCards: React.FC<PokemonCardsProps> = ({ pokemons }) => (
  <div className="flex flex-wrap justify-center gap-4 transition-all duration-300 ease-in-out">
    {pokemons.map((pokemon) => (
      <div
        key={pokemon.id}
        className="relative w-32 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 text-center hover:scale-105 transform"
      >
        <a key={pokemon.id} href={`/pokedex/${pokemon.slug}`} className="block">
          <div
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/originals/98/c1/5a/98c15a449a1166ec23f5c9f1f63995dd.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden"
          >
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
      </div>
    ))}
  </div>
);

export default PokemonCards;
