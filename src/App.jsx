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

import AdminLayout from './admin/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import AdminPlayers from './admin/pages/Players';
import AdminGallery from './admin/pages/Gallery';
import AdminOutreach from './admin/pages/Outreach';
import AdminEvents from './admin/pages/Events';
import AdminDonations from './admin/pages/Donations';
import Settings from './admin/pages/Settings';
import Login from './admin/pages/Login';
import AdminStaff from './admin/pages/Staff';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
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

        {/* Auth Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="players" element={<AdminPlayers />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="outreach" element={<AdminOutreach />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
