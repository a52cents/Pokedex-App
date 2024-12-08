import { env } from "process";
import { useConfig } from "vike-react/useConfig";
import type { Pokemon } from "./types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const config = useConfig();

  // Appel à l'API pour récupérer les données des Pokémon
  const response = await fetch(
    "https://pokedex.coda.memento-dev.fr/pokemon?limit=30",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.POKEMON_API_KEY}`,
      },
    }
  );

  // Conversion de la réponse en JSON et typage des données
  const pokemonsData = (await response.json()) as Pokemon[];

  // Configuration du titre de la page
  config({
    title: `Pokedex`,
  });

  // Retour des données des Pokémon
  return pokemonsData;
};
