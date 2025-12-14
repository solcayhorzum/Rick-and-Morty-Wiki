import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation";
import Footer from "./components/footer";

import Home from "./pages/home";
import Characters from "./pages/characters";
import CharacterDetail from "./pages/characterDetail";
import Locations from "./pages/locations";
import LocationDetail from "./pages/locationDetail";  
import Episodes from "./pages/episodes";
import EpisodeDetail from "./pages/episodeDetail";


function App() {
  return (
    <Router>
      <Navbar />

      {}
      <main className="p-6 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/location/:id" element={<LocationDetail />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetail />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;