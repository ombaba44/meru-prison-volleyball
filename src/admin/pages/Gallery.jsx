import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { useGalleryStore } from '../store';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';

const categories = ['Matches', 'Outreach', 'Mental Health Walk', 'Training', 'Community Events'];

export default function GalleryAdmin() {
  const { images, fetchGallery, addImage, deleteImage } = useGalleryStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: categories[0], image_url: '' });

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.image_url) {
      await addImage(formData);
      setModalOpen(false);
      setFormData({ title: '', category: categories[0], image_url: '' });
      fetchGallery(); // Refresh after add
    }
  };

  const handleDelete = async (id) => {
    await deleteImage(id);
    fetchGallery(); // Refresh after delete
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gallery Uploads</h1>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-brand-green hover:bg-brand-lightGreen text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
          <HiPlus /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <motion.div key={img.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group relative bg-brand-accent rounded-xl overflow-hidden border border-white/5">
            <img src={img.image_url || img.src} alt={img.title || img.category} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <span className="bg-brand-gold text-brand-dark text-xs font-bold px-2 py-1 rounded self-start">
                {img.category}
              </span>
              <button onClick={() => handleDelete(img.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full self-end shadow-lg transition-colors">
                <HiTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Upload Image">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title / Description</label>
            <input 
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Finals vs Prisons Team"
              className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" disabled={!formData.image_url} className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark disabled:opacity-50 font-bold py-3 rounded-lg mt-4 transition-colors">
            Upload & Save
          </button>
        </form>
      </Modal>
    </div>
  );
}
