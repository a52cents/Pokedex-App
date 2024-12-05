import { env } from "process";
import { useConfig } from "vike-react/useConfig";

export type Pokemon = {
  id: string;
  name: string;
  sprites: Sprites;
  slug: string;
};

export type Sprites = {
  shiny: {
    male: string | null;
    female: string | null;
  };
  normal: {
    male: string | null;
    female: string | null;
  };
};
export type PokemonType = {
  name: string;
  slot: number;
  slug: string;
};

export type PokemonStat = {
  name: string;
  slug: string;
  base_stat: number;
};

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const config = useConfig();
  const response = await fetch(
    "https://pokedex.coda.memento-dev.fr/pokemon?limit=30",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.POKEMON_API_KEY}`,
      },
    }
  );
  const pokemonsData = (await response.json()) as Pokemon[];
  config({
    title: `${pokemonsData.length} Pokemons`,
  });
  return pokemonsData;
};
