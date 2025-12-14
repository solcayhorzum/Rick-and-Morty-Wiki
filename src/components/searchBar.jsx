export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-400 px-4 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    
  );
}
