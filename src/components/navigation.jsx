import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="
      sticky top-0 z-50
      bg-gray-900/90 backdrop-blur
      text-white p-4 flex gap-6
      border-b border-slate-700
    ">
      <Link to="/" className="hover:text-lime-400 transition">Home</Link>
      <Link to="/characters" className="hover:text-lime-400 transition">Characters</Link>
      <Link to="/locations" className="hover:text-lime-400 transition">Locations</Link>
      <Link to="/episodes" className="hover:text-lime-400 transition">Episodes</Link>
    </nav>
  );
}