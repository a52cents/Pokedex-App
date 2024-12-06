// +Page.tsx
import { useEffect, useState } from "react";
import { useTeamContext } from "../../contexts/TeamContext";
import { EmptySlot } from "./components/EmptySlot";
import { PokemonCard } from "./components/PokemonCard";
import { TeamStats } from "./components/TeamStats";
import {
  onDeleteTeam,
  onGetTeams,
  onLoadTeam,
  onSaveTeam,
} from "./equipe.telefunc";
import { calculateTeamStats, getUniqueTypes } from "./utils/calculation";

export default function Page() {
  const { team, removeFromTeam, setTeam, selectedTeamId, setSelectedTeamId } =
    useTeamContext();
  const [teamName, setTeamName] = useState("");
  const [savedTeams, setSavedTeams] = useState<any[]>([]);

  useEffect(() => {
    loadTeams();
  }, []);
  const loadTeams = async () => {
    try {
      const teams = await onGetTeams();
      setSavedTeams(teams);
    } catch (error) {
      alert("Erreur lors du chargement des équipes");
    }
  };
  const handleSaveTeam = async () => {
    if (!teamName.trim() && !selectedTeamId) {
      alert("Veuillez donner un nom à votre équipe");
      return;
    }

    try {
      await onSaveTeam({
        id: selectedTeamId || undefined,
        name: selectedTeamId
          ? savedTeams.find((t) => t.id === selectedTeamId)?.name || teamName
          : teamName,
        pokemons: team,
        stats: calculateTeamStats(team) || [],
        types: getUniqueTypes(team),
      });
      if (!selectedTeamId) setTeamName("");
      loadTeams();
      alert("Equipe sauvegardée");
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleLoadTeam = async (id: number) => {
    try {
      const loadedTeam = await onLoadTeam(id);

      setTeam(loadedTeam.pokemons);
    } catch (error) {
      alert("Erreur lors du chargement de l'équipe");
    }
  };

  const handleDeleteTeam = async () => {
    if (!selectedTeamId) return;
    if (!confirm("Voulez-vous vraiment supprimer cette équipe ?")) return;

    try {
      await onDeleteTeam(selectedTeamId);
      setSelectedTeamId(0);
      setTeam([]);
      loadTeams();
      alert("Équipe supprimée");
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Mon Équipe</h1>

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {Array.from({ length: 6 }).map((_, index) => {
          const pokemonAtPosition = team.find((p) => p.position === index);

          return pokemonAtPosition ? (
            <PokemonCard
              key={`pokemon-${index}`}
              pokemon={pokemonAtPosition}
              onRemove={() => removeFromTeam(pokemonAtPosition)}
            />
          ) : (
            <EmptySlot key={`empty-${index}`} index={index} />
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Nom de l'équipe"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSaveTeam}
            disabled={team.length === 0}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
          >
            Sauvegarder l'équipe
          </button>
        </div>

        <select
          value={selectedTeamId}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedTeamId(id);
            if (id) handleLoadTeam(id);
          }}
          className="p-2 border border-gray-300 rounded-lg min-w-[200px]"
        >
          <option value={0}>Charger une équipe</option>
          {savedTeams.map((savedTeam) => (
            <option key={savedTeam.id} value={savedTeam.id}>
              {savedTeam.name}
            </option>
          ))}
        </select>
        {selectedTeamId > 0 && (
          <button
            onClick={handleDeleteTeam}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>

      {team.length === 0 ? (
        <p className="text-center mt-8 text-gray-600">
          Ajoutez des Pokémon à votre équipe depuis le Pokédex !
        </p>
      ) : (
        <TeamStats team={team} />
      )}
    </div>
  );
}
