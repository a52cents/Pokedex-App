import prisma from "../../lib/prisma";
import type { TeamPokemon } from "../../contexts/TeamContext";

type SaveTeamInput = {
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

export async function onSaveTeam(input: SaveTeamInput & { id?: number }) {
  try {
    if (input.id) {
      return await prisma.team.update({
        where: { id: input.id },
        data: {
          name: input.name,
          pokemons: JSON.stringify(input.pokemons),
          stats: JSON.stringify(input.stats),
          types: JSON.stringify(input.types),
        },
      });
    }
    return await prisma.team.create({
      data: {
        name: input.name,
        pokemons: JSON.stringify(input.pokemons),
        stats: JSON.stringify(input.stats),
        types: JSON.stringify(input.types),
      },
    });
  } catch (error) {
    console.error("Erreur:", error);
    throw new Error("Impossible de sauvegarder l'équipe");
  }
}

export async function onLoadTeam(id: number) {
  try {
    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new Error("Équipe non trouvée");
    }

    return {
      ...team,
      pokemons: JSON.parse(team.pokemons),
      stats: JSON.parse(team.stats),
      types: JSON.parse(team.types),
    };
  } catch (error) {
    console.error("Erreur lors du chargement:", error);
    throw new Error("Impossible de charger l'équipe");
  }
}

export async function onGetTeams() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: "desc" },
    });
    return teams.map((team) => ({
      ...team,
      pokemons: JSON.parse(team.pokemons),
      stats: JSON.parse(team.stats),
      types: JSON.parse(team.types),
    }));
  } catch (error) {
    console.error("Erreur lors du chargement des équipes:", error);
    throw new Error("Impossible de charger les équipes");
  }
}

export async function onDeleteTeam(id: number) {
  try {
    await prisma.team.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer l'équipe");
  }
}
