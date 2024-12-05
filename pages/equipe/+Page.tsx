// +Page.tsx
import { useTeamContext } from "../../contexts/TeamContext";
import { EmptySlot } from "./components/EmptySlot";
import { PokemonCard } from "./components/PokemonCard";
import { TeamStats } from "./components/TeamStats";

export default function Page() {
  const { team, removeFromTeam } = useTeamContext();

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
