import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacterById } from "../services/api";
import { useNavigate } from "react-router-dom"; 



export default function CharacterDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    getCharacterById(id).then((data) => {
      setCharacter(data);
    });
  }, [id]);

  if (!character) {
    return <p className="text-gray-600">Loading...</p>;
  }


  const statusColor =
    character.status === "Alive"
      ? "bg-green-500"
      : character.status === "Dead"
      ? "bg-red-500"
      : "bg-gray-500";

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
    <div className="
  bg-slate-600 backdrop-blur
  border border-lime-500/40
  rounded-3xl
  p-6 md:p-8
  shadow-2xl
  flex flex-col md:flex-row gap-10
">
      {/*foto*/}
      <img
        src={character.image}
        alt={character.name}
        className="   rounded-2xl
    shadow-xl
    w-40 md:w-56
    border border-slate-700"


      />

      {}
      <div>
        <h1 className="text-4xl font-bold mb-3">{character.name}</h1>

        {/*status*/}
        <span
          className={`inline-block px-3 py-1 text-white rounded-full text-sm mb-4 ${statusColor}`}
        >
          {character.status}
        </span>

        <p className="text-lg"><strong>Species:</strong> {character.species}</p>
        <p className="text-lg"><strong>Gender:</strong> {character.gender}</p>
        <p className="text-lg"><strong>Origin:</strong> {character.origin?.name}</p>
        <p className="text-lg"><strong>Location:</strong> {character.location?.name}</p>

        <p className="text-lg mt-3">
          <strong>Episodes featured in:</strong> {character.episode.length}
        </p>
      </div>
    </div>
    </div>
  );
}
