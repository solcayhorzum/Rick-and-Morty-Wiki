export default function FilterButtons({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 rounded border 
              ${value === opt ? "bg-green-500 text-white" : "bg-gray-200"}
              hover:bg-green-400 hover:text-white transition`}
          >
            {opt}
          </button>
        ))}

        <button
          onClick={() => onChange("")}
          className={`px-3 py-1 rounded border 
              ${value === "" ? "bg-green-500 text-white" : "bg-gray-200"}
              hover:bg-green-400 hover:text-white transition`}
        >
          All
        </button>
      </div>
    </div>
  );
}
