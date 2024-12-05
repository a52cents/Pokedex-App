// utils/calculations.ts
import type { TeamPokemon } from "../../../contexts/TeamContext";

export const calculateTeamStats = (team: TeamPokemon[]) => {
  if (team.length === 0) return null;

  const initialStats: { [key: string]: number } = {
    hp: 0,
    attack: 0,
    defense: 0,
    "special-attack": 0,
    "special-defense": 0,
    speed: 0,
  };

  const totalStats = team.reduce((acc, { pokemon }) => {
    pokemon.stats?.forEach((stat) => {
      acc[stat.slug as keyof typeof initialStats] += stat.base_stat;
    });
    return acc;
  }, initialStats);

  return Object.entries(totalStats).map(([key, value]) => ({
    name: key,
    value: Math.round(value / team.length),
  }));
};

export const getUniqueTypes = (team: TeamPokemon[]) => {
  const typeCount = new Map<string, number>();

  team.forEach(({ pokemon }) => {
    pokemon.types.forEach((type) => {
      typeCount.set(type.name, (typeCount.get(type.name) || 0) + 1);
    });
  });

  return Array.from(typeCount.entries()).map(([name, count]) => ({
    name,
    count,
  }));
};
