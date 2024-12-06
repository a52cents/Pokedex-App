// components/TeamStats.tsx
import type { TeamStatsProps } from "../types/types";
import { calculateTeamStats, getUniqueTypes, STAT_MAX_VALUES, getStatColor } from "../utils/calculation";
import { TYPE_COLORS } from "../../../types/typeColors";

export const TeamStats = ({ team }: TeamStatsProps) => {
  const avgStats = calculateTeamStats(team);
  const uniqueTypes = getUniqueTypes(team);

  if (!avgStats || team.length === 0) return null;

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Statistiques de l'équipe</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Types présents :</h3>
        <div className="flex flex-wrap gap-2">
          {uniqueTypes.map((type) => (
            <span
              key={type.slug}
              className={`px-3 py-1 rounded-full text-white ${
                TYPE_COLORS[type.slug as keyof typeof TYPE_COLORS]
              }`}
            >
              {type.count}× {type.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Moyennes des statistiques :</h3>
        <div className="space-y-2">
          {avgStats.map((stat) => (
            <div key={stat.name} className="flex items-center gap-3">
              <span className="w-32 font-medium capitalize">{stat.name.replace("-", " ")}:</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getStatColor(stat.value, STAT_MAX_VALUES[stat.name as keyof typeof STAT_MAX_VALUES])}`}
                  style={{ width: `${(stat.value / STAT_MAX_VALUES[stat.name as keyof typeof STAT_MAX_VALUES]) * 100}%` }}
                />
              </div>
              <span className="w-12 text-right">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};