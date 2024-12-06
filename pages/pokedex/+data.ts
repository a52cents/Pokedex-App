import { env } from "process";
import { useConfig } from "vike-react/useConfig";
import type { Pokemon } from "./types";

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
    title: ` Pokedex`,
  });
  return pokemonsData;
};
