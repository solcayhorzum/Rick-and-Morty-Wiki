export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 hover:border-lime-400 transition">

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        
        {/*sol */}
        <p>
          © {new Date().getFullYear()} Rick & Morty Wiki 
        </p>

        {/*sağ */}
        <p>
          Data provided by{" "}
          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime-400 hover:underline"
          >
            The Rick and Morty API
          </a>
        </p>

      </div>
    </footer>
  );
}
