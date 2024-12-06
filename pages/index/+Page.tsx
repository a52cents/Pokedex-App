export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Pokémon - CODA</h1>

      <div className="mx-auto bg-white rounded-lg shadow-lg p-8">
        <p className="text-xl mb-4">
          Bienvenue sur <strong>Pokémon - CODA</strong> !
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Un site web qui vous permet de :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">📚 Explorez le Pokédex</h2>
            <p className="text-gray-600">
              Découvrez tous les Pokémon disponibles et leurs statistiques
              détaillées.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">🎮 Créez vos équipes</h2>
            <p className="text-gray-600">
              Composez et sauvegardez vos équipes de Pokémon préférées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
