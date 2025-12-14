import { Link } from "react-router-dom";

export default function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`}>
      <div className="bg-white shadow rounded p-4 hover:scale-105 transition">
        <img src={character.image} alt={character.name} className="rounded mb-3" />
        <h2 className="font-semibold">{character.name}</h2>
        <p className="text-gray-600">{character.species}</p>
      </div>
    </Link>
  );
}
