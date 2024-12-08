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
  // calcul stats totale
  const totalStats = team.reduce((acc, { pokemon }) => {
    pokemon.stats?.forEach((stat) => {
      acc[stat.slug as keyof typeof initialStats] += stat.base_stat;
    });
    return acc;
  }, initialStats);
  // calcul stats moyennes
  return Object.entries(totalStats).map(([key, value]) => ({
    name: key,
    value: Math.round(value / team.length),
  }));
};
// obtenir les differents types de l'equipe
export const getUniqueTypes = (team: TeamPokemon[]) => {
  const typeCount = new Map<string, { name: string; count: number }>();
  // comptage des types
  team.forEach(({ pokemon }) => {
    pokemon.types.forEach((type) => {
      const slug = type.slug;
      if (typeCount.has(slug)) {
        typeCount.get(slug)!.count += 1;
      } else {
        typeCount.set(slug, { name: type.name, count: 1 });
      }
    });
  });

  return Array.from(typeCount.entries())
    .map(([slug, { name, count }]) => ({
      slug,
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

// stats max des pokemons
export const STAT_MAX_VALUES = {
  hp: 255,
  attack: 190,
  defense: 250,
  "special-attack": 194,
  "special-defense": 250,
  speed: 200,
};
// fonction pour la obtenir la couleur de la stats en fonction de sa valeur
export const getStatColor = (value: number, maxValue: number) => {
  const ratio = value / maxValue;
  if (ratio < 0.33) return "bg-red-500";
  if (ratio < 0.66) return "bg-yellow-500";
  return "bg-green-500";
};
