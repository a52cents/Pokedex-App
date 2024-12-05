// pages/pokedex/types.ts
export type PokemonType = {
  slug: string;
  name: string;
};

export const POKEMON_TYPES: PokemonType[] = [
  { slug: "bug", name: "Insecte" },
  { slug: "dark", name: "Ténèbres" },
  { slug: "dragon", name: "Dragon" },
  { slug: "electric", name: "Électrik" },
  { slug: "fairy", name: "Fée" },
  { slug: "fighting", name: "Combat" },
  { slug: "fire", name: "Feu" },
  { slug: "flying", name: "Vol" },
  { slug: "ghost", name: "Spectre" },
  { slug: "grass", name: "Plante" },
  { slug: "ground", name: "Sol" },
  { slug: "ice", name: "Glace" },
  { slug: "normal", name: "Normal" },
  { slug: "poison", name: "Poison" },
  { slug: "psychic", name: "Psy" },
  { slug: "rock", name: "Roche" },
  { slug: "steel", name: "Acier" },
  { slug: "water", name: "Eau" },
];
