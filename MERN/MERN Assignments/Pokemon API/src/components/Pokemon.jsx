import React, { useState } from "react";

const Pokemon = () => {
  const [pokemons, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      // Fetching first 30 Pokemon
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1800",
      );
      const data = await response.json();
      setPokemon(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      {/* Header Section */}
      <header className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-yellow-400 drop-shadow-[0_4px_0_rgba(59,76,202,1)] font-pokemon-retro">
          Pokédex
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          Fetch and browse the first 30 Pokémon directly from the official
          PokéAPI.
        </p>
      </header>

      {/* Action Button */}
      <div>
        <button
          type="button"
          onClick={fetchPokemon}
          disabled={loading}
          className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-red-900/30 transition-all duration-200 hover:scale-105 hover:from-red-500 hover:to-red-400 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
        >
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-slate-900 group-hover:animate-ping" />
            {loading ? "Catching 'em all..." : "Fetch 30 Pokémon"}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="w-full min-h-[250px] flex justify-center items-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-yellow-400 py-12">
            <i
              className="fa-solid fa-spinner fa-spin-pulse text-4xl"
              style={{ color: "#ffde00" }}
            ></i>
            <span className="text-sm font-semibold tracking-wide text-yellow-400">
              Loading entries...
            </span>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center max-w-md">
            <p className="text-red-400 font-medium">Error: {error}</p>
          </div>
        ) : pokemons.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pokemons.map((poke, index) => {
              const pokemonId = index + 1;
              // Official artwork image URL from Pokemon repository
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

              return (
                <div
                  key={poke.name}
                  className="group relative bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/5"
                >
                  {/* Badge Number */}
                  <span className="absolute top-3 right-3 text-xs font-mono font-bold text-slate-500 group-hover:text-yellow-400">
                    #{String(pokemonId).padStart(3, "0")}
                  </span>

                  {/* Sprite Image */}
                  <div className="w-16 h-16 bg-slate-900/60 rounded-xl p-1 flex-shrink-0 border border-slate-700/40 group-hover:border-slate-600">
                    <img
                      src={imageUrl}
                      alt={poke.name}
                      className="w-full h-full object-contain drop-shadow"
                      loading="lazy"
                    />
                  </div>

                  {/* Pokémon Name */}
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold capitalize text-slate-100 group-hover:text-yellow-300 transition-colors">
                      {poke.name}
                    </h2>
                    <span className="text-xs text-slate-400">
                      Entry #{pokemonId}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-slate-500 text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl w-full">
            <p>Click the button above to load Pokémon!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pokemon;
