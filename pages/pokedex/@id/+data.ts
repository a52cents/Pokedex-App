import { PageContextServer } from "vike/types";
import { Pokemon } from "../+data";
import type { Sprites, PokemonType, PokemonStat } from "../+data";

export type Response = {
  current: PokemonDetails;
  previous?: PokemonDetails;
  next?: PokemonDetails;
};
export type PokemonDetails = {
  id: number;
  slug: string;
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  stats?: PokemonStat[];
  previous?: {
    id: number;
    slug: string;
    name: string;
    sprites: Sprites;
    types: PokemonType[];
  };
  next?: {
    id: number;
    slug: string;
    name: string;
    sprites: Sprites;
    types: PokemonType[];
  };
};
export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const response = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon/${pageContext.routeParams.id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.POKEMON_API_KEY}`,
      },
    }
  );
  const pokemonData = (await response.json()) as Response;
  console.log(pokemonData);
  return pokemonData;
};
