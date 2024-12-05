import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { useState } from "react";
import { useTeamContext } from "../../../contexts/TeamContext";
export default function Page() {
  const pokemon = useData<Data>();
  const { current, previous, next } = pokemon;
  const [isShiny, setIsShiny] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const { team, addToTeam } = useTeamContext();

  const hasFemaleVersion = isShiny
    ? current.sprites.shiny.female !== null
    : current.sprites.normal.female !== null;

  const currentSprite = isShiny
    ? isFemale
      ? current.sprites.shiny.female
      : current.sprites.shiny.male
    : isFemale
    ? current.sprites.normal.female
    : current.sprites.normal.male;

  const handleAddToTeam = () => {
    const position = team.length;
    addToTeam({
      pokemon: current,
      isShiny,
      isFemale,
      position,
    });
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Navigation */}
          <div className="w-full flex justify-between mb-8">
            {previous && (
              <a
                href={`/pokedex/${previous.slug}`}
                className="text-blue-500 hover:underline"
              >
                ← {previous.name}
              </a>
            )}
            {next && (
              <a
                href={`/pokedex/${next.slug}`}
                className="text-blue-500 hover:underline"
              >
                {next.name} →
              </a>
            )}
          </div>

          {/* Nom et ID */}
          <h1 className="text-4xl font-bold mb-8">
            #{current.id} {current.name}
          </h1>

          {/* Layout Flex pour l'image et les stats */}
          <div className="flex gap-8 items-start w-full">
            {/* Image et Options - Côté gauche */}
            <div className="flex-shrink-0">
              <div className="w-80 h-80 bg-gray-50 rounded-xl shadow-lg p-4 mb-4">
                <img
                  src={currentSprite || ""}
                  alt={current.name}
                  className="w-full h-full object-contain image-rendering-pixelated"
                />
              </div>

              {/* Toggles */}
              <div className="flex justify-center gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isShiny}
                    onChange={(e) => setIsShiny(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span>Shiny</span>
                </label>
                {hasFemaleVersion && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFemale}
                      onChange={(e) => setIsFemale(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span>Femelle</span>
                  </label>
                )}
              </div>
              <button
                onClick={handleAddToTeam}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                {team.length >= 6 ? "Équipe complète" : "Ajouter à l'équipe"}
              </button>
            </div>

            {/* Stats et Types */}
            <div className="flex-1">
              {/* Types */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Types</h2>
                <div className="flex gap-3">
                  {current.types.map((type) => (
                    <span
                      key={type.slug}
                      className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 font-medium"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {current.stats && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
                  <div className="space-y-3">
                    {current.stats.map((stat) => (
                      <div key={stat.slug} className="flex items-center gap-3">
                        <span className="w-32 font-medium">{stat.name}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="w-12 text-right font-medium">
                          {stat.base_stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
