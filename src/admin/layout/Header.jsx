import { HiMenu, HiBell, HiSearch } from 'react-icons/hi';
import { Images } from '../../data/images';
import { useSettingsStore } from '../store';

export default function Header({ toggleSidebar }) {
  const { settings } = useSettingsStore();
  
  return (
    <header className="h-20 bg-brand-dark/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <HiMenu size={24} />
        </button>
        
        <div className="hidden md:flex items-center bg-brand-accent/50 border border-white/10 rounded-full px-4 py-2">
          <HiSearch className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search CMS..." 
            className="bg-transparent border-none outline-none text-sm text-white px-3 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 relative">
          <HiBell size={24} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-gold rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white">Admin User</p>
            <p className="text-xs text-brand-gold">Superadmin</p>
          </div>
          <img src={settings?.logo_url || Images.logos.teamLogo} alt="Admin" className="w-10 h-10 rounded-full border-2 border-brand-green object-contain bg-white" />
        </div>
      </div>
    </header>
  );
}
