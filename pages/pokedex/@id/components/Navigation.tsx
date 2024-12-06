import React from "react";

interface Pokemon {
  name: string;
  slug: string;
  sprites: {
    normal: {
      male: string | null;
    };
  };
}

interface HoveredPokemon {
  name: string;
  sprite: string;
}

interface NavigationProps {
  previous?: Pokemon;
  next?: Pokemon;
  hoveredPokemon: HoveredPokemon | null;
  setHoveredPokemon: (pokemon: HoveredPokemon | null) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  previous,
  next,
  hoveredPokemon,
  setHoveredPokemon,
}) => {
  return (
    <div className="w-full flex justify-between mb-8">
      {previous && (
        <div
          onMouseEnter={() =>
            setHoveredPokemon({
              name: previous.name,
              sprite: previous.sprites.normal.male || "",
            })
          }
          onMouseLeave={() => setHoveredPokemon(null)}
        >
          <a
            href={`/pokedex/${previous.slug}`}
            className="text-blue-500 hover:underline"
          >
            ← {previous.name}
          </a>
          {hoveredPokemon && hoveredPokemon.name === previous.name && (
            <div className="absolute mt-2">
              <img
                src={hoveredPokemon.sprite}
                alt={hoveredPokemon.name}
                className="w-20 h-20 object-contain"
              />
            </div>
          )}
        </div>
      )}
      {next && (
        <div
          onMouseEnter={() =>
            setHoveredPokemon({
              name: next.name,
              sprite: next.sprites.normal.male || "",
            })
          }
          onMouseLeave={() => setHoveredPokemon(null)}
        >
          <a
            href={`/pokedex/${next.slug}`}
            className="text-blue-500 hover:underline"
          >
            {next.name} →
          </a>
          {hoveredPokemon && hoveredPokemon.name === next.name && (
            <div className="absolute mt-2">
              <img
                src={hoveredPokemon.sprite}
                alt={hoveredPokemon.name}
                className="w-20 h-20 object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
