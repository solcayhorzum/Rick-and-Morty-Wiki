import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [luckyEpisode, setLuckyEpisode] = useState(null);
  const [used, setUsed] = useState(false);
const [luckyLoading, setLuckyLoading] = useState(false);
  const getLuckyEpisode = async () => {
  if (used) return;

  setUsed(true);
  setLuckyLoading(true); 

  const randomId = Math.floor(Math.random() * 51) + 1;

  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/${randomId}`
    );
    const data = await res.json();
    setLuckyEpisode(data);
  } catch (err) {
    console.error("Failed to fetch lucky episode");
  } finally {
    setLuckyLoading(false); 
  }
};
  return (
    <div className="mt-6 space-y-12">
      {}
      <div
        className="relative min-h-[60vh] rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-slate-950/80 to-cyan-900/40" />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
          <p className="text-sm uppercase tracking-[0.30em] text-lime-300 mb-2">
            Rick & Morty Wiki
          </p>

          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            Explore the Multiverse of{" "}
            <span className="text-lime-300">Rick & Morty</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-xl mb-8">
            Browse characters, locations and episodes from the chaotic universe
            of Rick and Morty. Search, filter and explore across dimensions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/characters"
              className="px-6 py-2 rounded-full bg-lime-400 text-slate-950 font-semibold hover:bg-lime-300 transition"
            >
              Browse Characters
            </Link>

            <Link
              to="/locations"
              className="px-6 py-2 rounded-full border border-cyan-400 text-cyan-300 font-semibold hover:bg-cyan-400 hover:text-slate-950 transition"
            >
              Explore Locations
            </Link>

            <Link
              to="/episodes"
              className="px-6 py-2 rounded-full border border-purple-400 text-purple-300 font-semibold hover:bg-purple-400 hover:text-slate-950 transition"
            >
              View Episodes
            </Link>
          </div>
        </div>
      </div>

      {}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2 text-lime-300">
            Characters
          </h2>
          <p className="text-sm text-slate-300">
            View detailed character profiles. Search by name, filter by species
            or gender, and explore origins and locations.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2 text-cyan-300">
            Locations
          </h2>
          <p className="text-sm text-slate-300">
            Discover iconic places across dimensions and see which characters
            reside there.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2 text-purple-300">
            Episodes
          </h2>
          <p className="text-sm text-slate-300">
            Browse all episodes, check air dates, and explore which characters
            appear in each episode.
          </p>
        </div>
      </div>

      {}
      <div className="flex flex-col items-center gap-5">
  <button
    onClick={getLuckyEpisode}
    disabled={used}
    className={`px-8 py-4 rounded-full font-semibold transition
      ${
        used
          ? "bg-gray-600 text-gray-300 cursor-not-allowed"
          : "bg-purple-400 text-slate-950 hover:bg-purple-300"
      }`}
  >
    🎲 Your Lucky Episode
  </button>

  {}
  {luckyLoading && (
    <p className="text-purple-300 text-lg animate-pulse">
      Finding your lucky episode...
    </p>
  )}

  {/*result */}
  {!luckyLoading && luckyEpisode && (
    <div className="mt-6 max-w-xl w-full bg-slate-900/80 border border-purple-400 rounded-2xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-purple-300 mb-3">
        {luckyEpisode.name}
      </h3>

      <p className="text-sm text-slate-300">
        <strong>Episode:</strong> {luckyEpisode.episode}
      </p>

      <p className="text-sm text-slate-400 mb-6">
        <strong>Air Date:</strong> {luckyEpisode.air_date}
      </p>

      <Link
        to={`/episodes/${luckyEpisode.id}`}
        className="inline-block px-6 py-2 bg-purple-400 text-black rounded-full hover:bg-purple-300 transition"
      >
        View Details
      </Link>
    </div>
  )}
</div>
    </div>
  );
}