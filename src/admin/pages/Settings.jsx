import { useState, useEffect } from 'react';
import { useSettingsStore } from '../store';
import ImageUpload from '../components/ImageUpload';
import { HiCog } from 'react-icons/hi';

export default function Settings() {
  const { settings, fetchSettings, updateSettings } = useSettingsStore();
  const [formData, setFormData] = useState({ club_name: '', logo_url: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings) {
      setFormData({
        club_name: settings.club_name || 'Meru Prison Stars',
        logo_url: settings.logo_url || ''
      });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
    fetchSettings();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <HiCog className="text-4xl text-brand-gold" />
        <h1 className="text-3xl font-bold text-white">Club Settings</h1>
      </div>

      <div className="bg-brand-accent/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Club Name</label>
            <input 
              required 
              type="text"
              value={formData.club_name} 
              onChange={e => setFormData({...formData, club_name: e.target.value})} 
              className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-green outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Club Logo</label>
            <p className="text-xs text-gray-500 mb-4">Upload a high-quality logo. This will be displayed on the navbar, footer, and admin dashboard.</p>
            <ImageUpload 
              value={formData.logo_url} 
              onChange={(url) => setFormData({...formData, logo_url: url})} 
              bucketFolder="logos"
            />
          </div>

          <div className="pt-4 border-t border-white/5">
            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
