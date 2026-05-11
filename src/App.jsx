import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Community from './pages/Community';
import MentalHealth from './pages/MentalHealth';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';
import NewsEvents from './pages/NewsEvents';
import Contact from './pages/Contact';
import HowToRun from './pages/HowToRun';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/community" element={<Community />} />
          <Route path="/campaigns" element={<MentalHealth />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<NewsEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-to-run" element={<HowToRun />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
