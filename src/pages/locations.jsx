import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";
import Loading from "../components/loading";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");       
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  
 useEffect(() => {
  const fetchLocations = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/location?page=${page}`
      );

      //HTTP error
      if (!res.ok) {
        throw new Error("Failed to load locations");
      }

      const data = await res.json();

      //API boş veri dönerse hata
      if (!data || !data.results) {
        setHasMore(false);
        return;
      }

      setLocations((prev) => [...prev, ...data.results]);
      setHasMore(data.info?.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchLocations();
}, [page]);

  
  useEffect(() => {
    if (page !== 1) {
      setLocations([]);
      setPage(1);
    }
  }, [search]);

  
  const filtered = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Locations</h1>

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
        {filtered.map((loc) => (
          <li
            key={loc.id}
            className="
              bg-gradient-to-r 
              from-purple-800 
              via-purple-700 
              to-gray-800 
              text-white 
              border border-purple-400 
              p-2
              rounded-xl 
              shadow-lg 
              flex flex-col lg:flex-row gap-4 items-center
              hover:shadow-purple-300 hover:border-purple-300 transition
            "
          >
            <div className="flex-1 text-center lg:text-left">
              <p className="font-semibold tracking-wide text-lg">
                {loc.name}
              </p>
              <p className="text-sm text-gray-300">{loc.type}</p>
              <p className="text-sm text-gray-400">{loc.dimension}</p>
            </div>

            <Link
              to={`/location/${loc.id}`}
              className="bg-purple-400 text-black px-4 py-2 rounded hover:bg-purple-300 transition"
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
            className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}