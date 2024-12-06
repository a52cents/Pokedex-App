import React from "react";
import { PokemonDetails } from "../+data";

interface ImageOptionsProps {
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
  isShiny: boolean;
  setIsShiny: (isShiny: boolean) => void;
  isFemale: boolean;
  setIsFemale: (isFemale: boolean) => void;
  isAdded: boolean;
  isFull: boolean;
  currentSprite: string;
  current: PokemonDetails;
  hasFemaleVersion: boolean;
  handleAddToTeam: () => void;
  coordinates: { x: number; y: number };
}
const ImageOptions: React.FC<ImageOptionsProps> = ({
  isFull,
  handleAddToTeam,
  coordinates,
  current,
  hasFemaleVersion,
  handleMouseLeave,
  handleMouseMove,
  isShiny,
  currentSprite,
  isAdded,
  isFemale,
  setIsFemale,
  setIsShiny,
}) => (
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
          transform: `translateX(${coordinates.x * 0.4}px) translateY(${
            coordinates.y * 0.4
          }px)`,
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
);
export default ImageOptions;
