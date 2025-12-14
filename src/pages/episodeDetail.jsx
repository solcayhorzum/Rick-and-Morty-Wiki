import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom"; 

export default function EpisodeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisode(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <button
  onClick={() => navigate(-1)}
  className="
    sticky top-20 
    inline-flex items-center gap-2
    mb-6 px-3 py-1
    text-sm font-semibold
    bg-slate-800 text-green-300
    rounded-full border border-green-400
    hover:bg-green-400 hover:text-slate-900
    transition
  "
>
  ← Back
</button>
      <h1 className="text-4xl font-bold mb-4">{episode.name}</h1>

      <p><strong>Episode:</strong> {episode.episode}</p>
      <p><strong>Air Date:</strong> {episode.air_date}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        Characters in this episode
      </h2>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {episode.characters.slice(0, 8).map((url) => {
          const charId = url.split("/").pop();
          return (
            <Link
              key={charId}
              to={`/characters/${charId}`}
              className="p-3 bg-blue-300 rounded hover:bg-slate-700 transition text-center"
            >
              Character #{charId}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}