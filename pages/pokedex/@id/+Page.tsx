import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { useState } from "react";
import { useTeamContext } from "../../../contexts/TeamContext";
import { TYPE_COLORS } from "../../../types/typeColors";
export default function Page() {
  const pokemon = useData<Data>();
  const { current, previous, next } = pokemon;
  const [isShiny, setIsShiny] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const { team, addToTeam } = useTeamContext();
  const [isAdded, setIsAdded] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / card.offsetWidth) * 20 - 10;
    const y = ((e.clientY - rect.top) / card.offsetHeight) * 20 - 10;
    setCoordinates({ x, y });
  };

  const handleMouseLeave = () => {
    setCoordinates({ x: 0, y: 0 });
  };

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
    if (position < 6) {
      addToTeam({
        pokemon: current,
        isShiny,
        isFemale,
        position,
      });
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        if (team.length + 1 >= 6) {
          setIsFull(true);
        }
      }, 1500);
    }
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
              <div
                className="w-80 h-80 relative rounded-xl shadow-lg overflow-hidden transition-all duration-200 ease-out"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${
                    -coordinates.y * 0.5
                  }deg) rotateY(${coordinates.x * 0.5}deg)`,
                }}
              >
                {/* Fond parallaxe */}
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-200 ease-out overflow-hidden"
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/originals/98/c1/5a/98c15a449a1166ec23f5c9f1f63995dd.png')",
                  }}
                />

                {/* Pokémon parallaxe */}
                <div
                  className="relative z-10 h-full w-full flex items-center justify-center transition-transform duration-200 ease-out"
                  style={{
                    transform: `translateX(${
                      coordinates.x * 0.4
                    }px) translateY(${coordinates.y * 0.4}px)`,
                  }}
                >
                  <img
                    src={currentSprite || ""}
                    alt={current.name}
                    className="h-full w-full object-contain"
                  />
                </div>
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
                className={`w-full py-2 px-4 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isFull
                    ? "bg-red-500 hover:bg-red-600"
                    : isAdded
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  {isFull ? (
                    <div></div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-opacity duration-300 ${
                          isAdded ? "opacity-0" : "opacity-100"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 absolute transition-opacity duration-300 ${
                          isAdded ? "opacity-100" : "opacity-0"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </div>
                {isFull ? "Team Full" : isAdded ? "Added" : "Add to Team"}
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
                      className={`px-4 py-2 rounded-full ${
                        TYPE_COLORS[type.slug as keyof typeof TYPE_COLORS]
                      } text-white font-medium`}
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
