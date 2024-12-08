import { PokemonDetails } from "./@id/+data";

// Recherche de pokemons par nom et/ou type
export async function onPokemonSearch({
  searchTerm,
  type,
}: {
  searchTerm?: string;
  type?: string;
}) {
  //creations des params de la requete
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (type) params.append("type", type);
  params.append("with", "types");
  // Appel a l'api
  const response = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.POKEMON_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

// Ajout d'un pokemon à l'équipe
export async function onAddToTeam(teamPokemon: {
  pokemon: PokemonDetails;
  isShiny: boolean;
  isFemale: boolean;
  position: number;
}) {
  return teamPokemon;
}

// Chargement de plus de pokemons
export async function onLoadMorePokemons(
  offset: number,
  type?: string,
  searchTerm?: string
) {
  const params = new URLSearchParams();
  params.append("limit", "30");
  params.append("offset", offset.toString());
  if (type) params.append("type", type);
  if (searchTerm) params.append("search", searchTerm);

  const response = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.POKEMON_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data;
}
