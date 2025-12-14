import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";
import Loading from "../components/loading";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (page !== 1) {
      setEpisodes([]);
      setPage(1);
    }
  }, [search]);

 
  useEffect(() => {
  setLoading(true);

  fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch episodes");
      }
      return res.json();
    })
    .then((data) => {
      if (!data || !data.results) {
        setHasMore(false);
        return;
      }

      setEpisodes((prev) => [...prev, ...data.results]);
      setHasMore(data.info?.next !== null);
    })
    .catch((err) => {
      console.error(err);
      setHasMore(false);
    })
    .finally(() => {
      setLoading(false);
    });
}, [page]);

  
  const filtered = episodes.filter((ep) =>
    ep.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div>
      <h1 className="text-3xl font-bold mb-6">Episodes</h1>

      {/*search */}
      <SearchBar value={search} onChange={setSearch} />
   {error && (
       <p className="text-red-400 mt-4">
        {error}
       </p>
 )}
      {filtered.length === 0 && !loading && (
        <p className="text-gray-400 mt-4">No results found.</p>
      )}

      <ul className="grid grid-cols-2 gap-4 mt-6">
        {filtered.map((ep) => (
          <li
            key={ep.id}
            className="
              bg-gradient-to-r 
              from-cyan-800 
              via-cyan-700 
              to-gray-800 
              text-white 
              border border-cyan-400 
              p-2
              rounded-xl 
              shadow-lg 
              flex flex-col gap-3
              hover:shadow-cyan-300 hover:border-cyan-300 transition
            "
          >
            {}
            <p className="font-semibold tracking-wide text-lg text-cyan-300">
              {ep.name}
            </p>

            <p className="text-sm text-gray-300">
              <strong>Episode:</strong> {ep.episode}
            </p>

            <p className="text-sm text-gray-400">
              <strong>Air Date:</strong> {ep.air_date}
            </p>

            {/*details button*/}
            <Link
              to={`/episodes/${ep.id}`}
              className="
                self-start 
                bg-cyan-400 
                text-black 
                px-4 
                py-2 
                rounded 
                hover:bg-cyan-300 
                transition
              "
            >
              Details
            </Link>
          </li>
        ))}
      </ul>

      {loading && <Loading />}

      {/*load more sadece search boşken var */}
      {hasMore && !loading && search === "" && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}