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
