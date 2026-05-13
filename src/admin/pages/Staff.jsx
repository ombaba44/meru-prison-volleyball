import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { useStaffStore } from '../store';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';

export default function Staff() {
  const { staff, fetchStaff, addStaff, updateStaff, deleteStaff } = useStaffStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', role: '', department: '', category: 'technical', experience: '', bio: '', image_url: '' });

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const openModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData(member);
    } else {
      setEditingId(null);
      setFormData({ name: '', role: '', department: '', category: 'technical', experience: '', bio: '', image_url: '' });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateStaff(editingId, formData);
    } else {
      await addStaff(formData);
    }
    setModalOpen(false);
    fetchStaff();
  };

  const handleDelete = async (id) => {
    await deleteStaff(id);
    fetchStaff();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Staff Management</h1>
        <button 
          onClick={() => openModal()}
          className="bg-brand-green hover:bg-brand-lightGreen text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
          <HiPlus /> Add Staff
        </button>
      </div>

      <div className="bg-brand-accent/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-dark/50 text-gray-400 text-sm uppercase tracking-wider border-b border-white/5">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Role</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {staff.map((s) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={s.image_url} alt={s.name} className="w-12 h-12 rounded-lg object-cover bg-brand-dark" />
                      <div className="font-bold text-white">{s.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {s.role} <br/>
                    <span className="text-xs text-brand-gold">{s.department}</span>
                  </td>
                  <td className="p-4 text-gray-300 capitalize">{s.category}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(s)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"><HiPencil /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><HiTrash /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {staff.length === 0 && (
                <tr><td colSpan="4" className="p-8 text-center text-gray-500">No staff members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Staff Member' : 'Add Staff Member'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none">
                <option value="technical">Technical Team</option>
                <option value="management">Management Team</option>
                <option value="support">Support Team</option>
                <option value="development">Development Team</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role (e.g. Head Coach)</label>
              <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Department (Optional)</label>
              <input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Experience (Optional)</label>
            <input value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" placeholder="e.g. 5 Years Coaching" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            <textarea required rows="3" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-green outline-none" />
          </div>
          <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold py-3 rounded-lg mt-4 transition-colors">
            {editingId ? 'Save Changes' : 'Add Staff'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
