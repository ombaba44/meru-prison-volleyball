import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { useOutreachStore } from '../store';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';

export default function Outreach() {
  const { outreach, fetchOutreach, addOutreach, updateOutreach, deleteOutreach } = useOutreachStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', location: '', image_url: '' });

  useEffect(() => {
    fetchOutreach();
  }, [fetchOutreach]);

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', location: '', image_url: '' });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateOutreach(editingId, formData);
    } else {
      await addOutreach(formData);
    }
    setModalOpen(false);
    fetchOutreach();
  };

  const handleDelete = async (id) => {
    await deleteOutreach(id);
    fetchOutreach();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Outreach Projects</h1>
        <button onClick={() => openModal()} className="bg-brand-green hover:bg-brand-lightGreen text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <HiPlus /> Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outreach.map((item) => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-brand-accent/50 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <img src={item.image_url || item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              {item.location && <p className="text-brand-gold text-sm font-semibold mb-2">{item.location}</p>}
              <p className="text-gray-400 text-sm mb-4 flex-1">{item.description}</p>
              <div className="flex gap-2 justify-end border-t border-white/5 pt-4">
                <button onClick={() => openModal(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><HiPencil /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><HiTrash /></button>
              </div>
            </div>
          </motion.div>
        ))}
        {outreach.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500">No outreach projects found.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
          </div>
          <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg mt-4">Save</button>
        </form>
      </Modal>
    </div>
  );
}
