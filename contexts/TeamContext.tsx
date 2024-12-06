import { createContext, useContext, useState } from "react";
import type { PokemonDetails } from "../pages/pokedex/@id/+data";

export type TeamPokemon = {
  pokemon: PokemonDetails;
  isShiny: boolean;
  isFemale: boolean;
  position: number;
};

type TeamContextType = {
  team: TeamPokemon[];
  addToTeam: (pokemon: TeamPokemon) => void;
  removeFromTeam: (pokemon: TeamPokemon) => void;
  setTeam: (team: TeamPokemon[]) => void;
  selectedTeamId: number;
  setSelectedTeamId: (id: number) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

// contexts/TeamContext.tsx
export function TeamContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [team, setTeam] = useState<TeamPokemon[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0);

  const addToTeam = (pokemon: TeamPokemon) => {
    if (team.length >= 6) {
      alert("Votre équipe est déja complète !");
      return;
    }

    // Trouver la première position libre
    let position = 0;
    const usedPositions = new Set(team.map((p) => p.position));
    while (usedPositions.has(position)) {
      position++;
    }

    // Ajouter le pokemon avec la première position libre
    const newPokemon = { ...pokemon, position };
    setTeam([...team, newPokemon]);
  };

  const removeFromTeam = (pokemon: TeamPokemon) => {
    // Supprimer le pokémon et réorganiser les positions
    const newTeam = team
      .filter((p) => p.position !== pokemon.position)
      .map((p, index) => ({
        ...p,
        position: index, // Réassigner les positions consécutivement
      }));
    setTeam(newTeam);
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        addToTeam,
        removeFromTeam,
        setTeam,
        selectedTeamId,
        setSelectedTeamId,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeamContext() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamContextProvider");
  }
  return context;
}
