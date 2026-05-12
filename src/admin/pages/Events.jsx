import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { useEventsStore } from '../store';
import Modal from '../components/Modal';

export default function Events() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventsStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '' });

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({ title: '', date: '', location: '', description: '' });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateEvent(editingId, formData);
    } else {
      addEvent(formData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Events Schedule</h1>
        <button onClick={() => openModal()} className="bg-brand-green hover:bg-brand-lightGreen text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <HiPlus /> Add Event
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <motion.div key={evt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-brand-accent/50 border-l-4 border-l-brand-gold border-y border-r border-white/5 rounded-r-2xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{evt.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => openModal(evt)} className="text-blue-400 hover:text-blue-300"><HiPencil size={18} /></button>
                <button onClick={() => deleteEvent(evt.id)} className="text-red-400 hover:text-red-300"><HiTrash size={18} /></button>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-sm text-gray-300">
              <p className="flex items-center gap-2"><HiCalendar className="text-brand-gold"/> {evt.date}</p>
              <p className="flex items-center gap-2"><HiLocationMarker className="text-brand-green"/> {evt.location}</p>
            </div>
            <p className="text-gray-400 text-sm">{evt.description}</p>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Event' : 'Add Event'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Event Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-brand-green" />
          </div>
          <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg mt-4">Save Event</button>
        </form>
      </Modal>
    </div>
  );
}
