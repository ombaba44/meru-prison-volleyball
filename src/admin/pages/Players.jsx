import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { usePlayersStore } from '../store';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';

export default function Players() {
  const { players, fetchPlayers, addPlayer, updatePlayer, deletePlayer } = usePlayersStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', jersey_number: '', position: '', bio: '', quote: '', image_url: '' });

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const openModal = (player = null) => {
    if (player) {
      setEditingId(player.id);
      setFormData(player);
    } else {
      setEditingId(null);
      setFormData({ name: '', jersey_number: '', position: '', bio: '', quote: '', image_url: '' });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePlayer(editingId, formData);
    } else {
      await addPlayer(formData);
    }
    setModalOpen(false);
    fetchPlayers();
  };

  const handleDelete = async (id) => {
    await deletePlayer(id);
    fetchPlayers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Players Management</h1>
        <button 
          onClick={() => openModal()}
          className="bg-brand-green hover:bg-brand-lightGreen text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
          <HiPlus /> Add Player
        </button>
      </div>

      <div className="bg-brand-accent/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-dark/50 text-gray-400 text-sm uppercase tracking-wider border-b border-white/5">
                <th className="p-4">Player</th>
                <th className="p-4">Position</th>
                <th className="p-4">Number</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {players.map((p) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={p.image_url || p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-brand-dark" />
                      <div className="font-bold text-white">{p.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{p.position}</td>
                  <td className="p-4 text-gray-300">#{p.jersey_number || p.number}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(p)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"><HiPencil /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><HiTrash /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {players.length === 0 && (
                <tr><td colSpan="4" className="p-8 text-center text-gray-500">No players found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Player' : 'Add Player'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Jersey Number</label>
              <input required type="number" value={formData.jersey_number} onChange={e => setFormData({...formData, jersey_number: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Position</label>
            <input required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            <textarea required rows="3" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Quote (Optional)</label>
            <input value={formData.quote || ''} onChange={e => setFormData({...formData, quote: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
          </div>
          <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold py-3 rounded-lg mt-4 transition-colors">
            {editingId ? 'Save Changes' : 'Add Player'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
