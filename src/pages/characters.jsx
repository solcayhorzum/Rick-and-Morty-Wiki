import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";
import FilterButtons from "../components/filter";
import Loading from "../components/loading";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);


useEffect(() => {
  setLoading(true);

  fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}&species=${speciesFilter}&gender=${genderFilter}`
  )
    .then((res) => {
      if (!res.ok) {
        
        return { results: [], info: { next: null } };
      }
      return res.json();
    })
    .then((data) => {
      setCharacters((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );

      setHasMore(data.info?.next !== null);
    })
    .catch((err) => {
      console.error(err);
      setHasMore(false);
    })
    .finally(() => {
      setLoading(false);
    });
}, [page, search, speciesFilter, genderFilter]);

const filtered = characters
  .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  .filter((c) => (speciesFilter ? c.species === speciesFilter : true))
  .filter((c) => (genderFilter ? c.gender === genderFilter : true));
   
  return (
    
    <div>
      <h1 className="text-3xl font-bold mb-4">Characters</h1>

      <SearchBar value={search} onChange={setSearch} />
   {error && (
       <p className="text-red-400 mt-4">
        {error}
       </p>
 )}
      <FilterButtons
        label="Filter by Species"
        options={["Human", "Alien"]}
        value={speciesFilter}
        onChange={setSpeciesFilter}
      />

      <FilterButtons
        label="Filter by Gender"
        options={["Male", "Female"]}
        value={genderFilter}
        onChange={setGenderFilter}
      />

      {filtered.length === 0 && !loading && (
  <p className="text-gray-400 mt-4">No results found.</p>
)}

<ul className="grid grid-cols-2 gap-4 mt-6">
  {filtered.map((char) => (
    <li key={char.id}
            className="
              bg-gradient-to-r 
              from-green-800 
              via-green-700 
              to-gray-800 
              text-white 
              border border-lime-400 
              p-2
              rounded-xl 
              shadow-lg 
              flex flex-col lg:flex-row gap-3 items-center
              hover:shadow-lime-300 hover:border-lime-300 transition
            "
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-16 h-16 object-cover rounded-lg"
            />

            <div className="flex-1 text-center lg:text-left">
              <p className="font-semibold tracking-wide text-lg">
                {char.name}
              </p>
              <p className="text-sm text-gray-300">
                {char.species} • {char.gender}
              </p>
            </div>

            <Link
              to={`/characters/${char.id}`}
              className="bg-lime-400 text-black px-4 py-2 rounded hover:bg-lime-300 transition"
            >
              Details
            </Link>
          </li>
        ))}
      </ul>

      {loading && <Loading />}

      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)} 
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
