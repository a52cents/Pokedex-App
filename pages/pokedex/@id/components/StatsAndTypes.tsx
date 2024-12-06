// StatsAndTypes.tsx
import React from "react";
import { Pokemon } from "../../types";
import { TYPE_COLORS } from "../../../../types/typeColors";
import {
  getStatColor,
  STAT_MAX_VALUES,
} from "../../../equipe/utils/calculation";
import { PokemonDetails } from "../+data";

interface StatsAndTypesProps {
  pokemon: PokemonDetails;
}

const StatsAndTypes: React.FC<StatsAndTypesProps> = ({ pokemon }) => (
  <div className="flex-1">
    {/* Types */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Types</h2>
      <div className="flex gap-3">
        {pokemon.types.map((type) => (
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
    {pokemon.stats && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
        <div className="space-y-3">
          {pokemon.stats.map((stat) => (
            <div key={stat.slug} className="flex items-center gap-3">
              <span className="w-32 font-medium">{stat.name}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getStatColor(
                    stat.base_stat,
                    STAT_MAX_VALUES[stat.slug as keyof typeof STAT_MAX_VALUES]
                  )}`}
                  style={{
                    width: `${
                      (stat.base_stat /
                        STAT_MAX_VALUES[
                          stat.slug as keyof typeof STAT_MAX_VALUES
                        ]) *
                      100
                    }%`,
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
);

export default StatsAndTypes;
