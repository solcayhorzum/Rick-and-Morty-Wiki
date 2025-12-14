import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom"; 

export default function LocationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
      .then(res => res.json())
      .then(data => setLocation(data));
  }, [id]);

  if (!location) return <Loading />;

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
      <h1 className="text-4xl font-bold mb-4">{location.name}</h1>

      <p className="text-lg"><strong>Type:</strong> {location.type}</p>
      <p className="text-lg"><strong>Dimension:</strong> {location.dimension}</p>
      <p className="text-lg mb-6">
        <strong>Residents:</strong> {location.residents.length}
      </p>

      {/*resident preview kısmı */}
      <h2 className="text-2xl font-semibold mb-3">Residents</h2>

      {location.residents.length === 0 && (
        <p>No known residents.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {location.residents.slice(0, 6).map((url, idx) => {
          const residentId = url.split("/").pop();

          return (
            <Link
              key={idx}
              to={`/characters/${residentId}`}
              className="p-3 p-3 bg-purple-300 rounded hover:bg-slate-700 transition text-center"
            >
              <p>Resident #{residentId}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
