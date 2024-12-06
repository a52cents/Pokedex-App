// pages/pokedex/types.ts
export type PokemonTypeColor = {
  slug: string;
  name: string;
};

export type Pokemon = {
  id: string;
  name: string;
  sprites: Sprites;
  slug: string;
  types: PokemonType[];
  stats: PokemonStat[];
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

export const POKEMON_TYPES: PokemonTypeColor[] = [
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
