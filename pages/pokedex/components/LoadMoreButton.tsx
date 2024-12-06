import React from "react";

interface LoadMoreButtonProps {
  loadMorePokemons: () => void;
  isLoading: boolean;
  isSearching: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  loadMorePokemons,
  isLoading,
  isSearching,
}) => (
  <div className="flex justify-center mt-8">
    <button
      onClick={loadMorePokemons}
      disabled={isLoading || isSearching}
      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300"
    >
      {isLoading ? "Chargement..." : "Charger plus..."}
    </button>
  </div>
);

export default LoadMoreButton;
