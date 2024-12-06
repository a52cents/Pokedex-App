import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { useState } from "react";
import { useTeamContext } from "../../../contexts/TeamContext";
import { TYPE_COLORS } from "../../../types/typeColors";
import { Link } from "../../../components/Link";
import { getStatColor, STAT_MAX_VALUES } from "../../equipe/utils/calculation";
import Navigation from "./components/Navigation";
import StatsAndTypes from "./components/StatsAndTypes";
import ImageOptions from "./components/ImageOptions";
export default function Page() {
  const pokemon = useData<Data>();
  const { current, previous, next } = pokemon;
  const [isShiny, setIsShiny] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const { team, addToTeam } = useTeamContext();
  const [isAdded, setIsAdded] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [hoveredPokemon, setHoveredPokemon] = useState<{
    name: string;
    sprite: string;
  } | null>(null);

  /*For the parallax Effect*/
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
      ? current.sprites.shiny.female || current.sprites.shiny.male || ""
      : current.sprites.shiny.male || ""
    : isFemale
    ? current.sprites.normal.female || current.sprites.normal.male || ""
    : current.sprites.normal.male || "";

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
        <div className="mb-4">
          <Link href="/pokedex">← Retour au Pokédex</Link>
        </div>
        <div className="flex flex-col items-center">
          {/* Navigation */}
          <Navigation
            previous={previous}
            next={next}
            hoveredPokemon={hoveredPokemon}
            setHoveredPokemon={setHoveredPokemon}
          />

          {/* Nom et ID */}
          <h1 className="text-4xl font-bold mb-8">
            #{current.id} {current.name}
          </h1>

          {/* Layout Flex pour l'image et les stats */}
          <div className="flex gap-8 items-start w-full">
            {/* Image et Options - Côté gauche */}
            <ImageOptions
              {...{
                current,
                isShiny,
                isFemale,
                hasFemaleVersion,
                handleAddToTeam,
                handleMouseMove,
                handleMouseLeave,
                currentSprite,
                setIsFemale,
                setIsShiny,
                isAdded,
                isFull,
                coordinates,
              }}
            />
            <StatsAndTypes pokemon={current} />
          </div>
        </div>
      </div>
    </div>
  );
}
