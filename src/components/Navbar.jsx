import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { Images } from '../data/images';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Community', path: '/community' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'Donate', path: '/donate' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 glass border-b-0 border-white/10 shadow-md shadow-brand-dark/20 backdrop-blur-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={Images.logos.teamLogo} 
              alt="Meru Prison Volleyball Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-lg shadow-brand-gold/20 border-2 border-brand-green group-hover:scale-105 transition-transform" 
            />
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
              Meru Prison<br/><span className="text-brand-gold text-sm transition-colors">Volleyball Team</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-1 lg:space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'text-brand-gold bg-brand-green/30 border-b-2 border-brand-gold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-20 left-0 w-full border-t border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-brand-gold bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
