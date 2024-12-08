import { PageContextServer } from "vike/types";
import type { Sprites, PokemonType, PokemonStat } from "../types";
import { useConfig } from "vike-react/useConfig";

// creation du type de la reponse de l'api
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
  const config = useConfig();
  const response = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon/${pageContext.routeParams.id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.POKEMON_API_KEY}`,
      },
    }
  );
  const pokemonData = (await response.json()) as Response;
  config({
    title: `Détail de ${pokemonData.current.name}`,
  });
  return pokemonData;
};
