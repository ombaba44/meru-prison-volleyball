import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome, HiUsers, HiPhotograph, HiHeart, HiCalendar, HiCurrencyDollar, HiX, HiLogout, HiCog } from 'react-icons/hi';
import { Images } from '../../data/images';
import { useAuth } from '../../hooks/useAuth';
import { useSettingsStore } from '../store';
import { useEffect } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: HiHome },
  { name: 'Players', path: '/admin/players', icon: HiUsers },
  { name: 'Gallery', path: '/admin/gallery', icon: HiPhotograph },
  { name: 'Outreach', path: '/admin/outreach', icon: HiHeart },
  { name: 'Events', path: '/admin/events', icon: HiCalendar },
  { name: 'Donations', path: '/admin/donations', icon: HiCurrencyDollar },
  { name: 'Settings', path: '/admin/settings', icon: HiCog },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-brand-accent border-r border-white/5 shadow-2xl">
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <img 
            src={settings?.logo_url || Images.logos.prisonEmblem} 
            alt="Logo" 
            className="w-8 h-8 rounded-full object-contain bg-white" 
          />
          <span className="font-bold text-white tracking-tight">{settings?.club_name || 'Meru Prison Stars'} CMS</span>
        </div>
        <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
          <HiX size={24} />
        </button>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-brand-green text-brand-gold shadow-lg shadow-brand-green/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-brand-gold' : 'text-gray-400'} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <HiLogout size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
