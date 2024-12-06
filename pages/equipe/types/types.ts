// types/types.ts
import type { TeamPokemon } from "../../../contexts/TeamContext";

export type EmptySlotProps = {
  index: number;
};

export type PokemonCardProps = {
  pokemon: TeamPokemon;
  onRemove: () => void;
};

export type TeamStatsProps = {
  team: TeamPokemon[];
};

export type SaveTeamInput = {
  id?: number;
  name: string;
  pokemons: TeamPokemon[];
  stats: {
    name: string;
    value: number;
  }[];
  types: {
    name: string;
    count: number;
  }[];
};
