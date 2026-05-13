import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPhotograph, HiPencil, HiFolderOpen, HiArrowLeft } from 'react-icons/hi';
import { useGalleryStore, useGalleryEventsStore } from '../store';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';

const categories = ['Matches', 'Outreach', 'Mental Health Walk', 'Training', 'Community Events'];

export default function GalleryAdmin() {
  const { images, fetchGallery, addImage, deleteImage } = useGalleryStore();
  const { events, fetchEvents, addEvent, deleteEvent } = useGalleryEventsStore();
  
  const [activeEvent, setActiveEvent] = useState(null); // null means showing events list
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false);
  
  const [eventFormData, setEventFormData] = useState({ title: '', description: '', cover_image: '', location: '', event_date: '' });
  const [photoFormData, setPhotoFormData] = useState({ title: '', category: 'General Gallery', image_url: '', event_id: null, caption: '' });

  useEffect(() => {
    fetchEvents();
    fetchGallery();
  }, [fetchEvents, fetchGallery]);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if(eventFormData.cover_image && eventFormData.title) {
      await addEvent(eventFormData);
      setEventModalOpen(false);
      setEventFormData({ title: '', description: '', cover_image: '', location: '', event_date: '' });
      fetchEvents();
    }
  };

  const handleEventDelete = async (id) => {
    if(window.confirm('Are you sure? This will delete the event and all associated photos.')) {
      await deleteEvent(id);
      fetchEvents();
      fetchGallery();
    }
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if(photoFormData.image_url) {
      await addImage({
        title: photoFormData.title,
        category: photoFormData.category,
        image_url: photoFormData.image_url,
        event_id: photoFormData.event_id,
        caption: photoFormData.caption
      });
      setPhotoModalOpen(false);
      setPhotoFormData({ title: '', category: activeEvent ? activeEvent.title : 'General Gallery', image_url: '', event_id: activeEvent ? activeEvent.id : null, caption: '' });
      fetchGallery();
    }
  };

  const handlePhotoDelete = async (id) => {
    await deleteImage(id);
    fetchGallery();
  };

  // Filter photos based on active view
  const displayPhotos = activeEvent 
    ? images.filter(img => img.event_id === activeEvent.id)
    : images.filter(img => !img.event_id);

  return (
    <div className="space-y-6">
      {!activeEvent ? (
        // EVENTS LIST VIEW
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Media & Events</h1>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setPhotoFormData({ ...photoFormData, event_id: null, category: 'General Gallery' });
                  setPhotoModalOpen(true);
                }}
                className="bg-brand-accent hover:bg-white/10 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors border border-white/10"
              >
                <HiPhotograph /> Upload Loose Photo
              </button>
              <button 
                onClick={() => setEventModalOpen(true)}
                className="bg-brand-gold hover:bg-yellow-500 text-brand-dark px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
              >
                <HiPlus /> Create Event
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <motion.div key={event.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group relative bg-brand-accent rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="relative h-48">
                  <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-brand-gold mb-3">{event.location} • {event.event_date}</p>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{event.description}</p>
                  <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
                    <button 
                      onClick={() => setActiveEvent(event)}
                      className="text-white hover:text-brand-gold font-medium flex items-center gap-2 transition-colors"
                    >
                      <HiFolderOpen /> Manage Photos ({images.filter(i => i.event_id === event.id).length})
                    </button>
                    <button onClick={() => handleEventDelete(event.id)} className="text-red-500 hover:text-red-400 p-2 transition-colors">
                      <HiTrash size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-brand-accent/50 rounded-xl border border-white/5">
              No events found. Create one to organize your gallery!
            </div>
          )}

          <div className="pt-10 border-t border-white/10 mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">General Gallery (Loose Photos)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayPhotos.map((img) => (
                <div key={img.id} className="group relative bg-black rounded-lg overflow-hidden border border-white/10 aspect-square">
                  <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                  <button onClick={() => handlePhotoDelete(img.id)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // EVENT PHOTOS VIEW
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveEvent(null)}
                className="bg-brand-accent hover:bg-white/10 text-white p-2 rounded-lg transition-colors border border-white/10"
              >
                <HiArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">{activeEvent.title}</h1>
                <p className="text-gray-400 text-sm">Manage photos for this event</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setPhotoFormData({ ...photoFormData, event_id: activeEvent.id, category: activeEvent.title });
                setPhotoModalOpen(true);
              }}
              className="bg-brand-green hover:bg-brand-lightGreen text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
            >
              <HiPlus /> Add Photo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {displayPhotos.map((img) => (
              <motion.div key={img.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group relative bg-brand-accent rounded-xl overflow-hidden border border-white/5">
                <img src={img.image_url} alt={img.title} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <span className="text-white text-xs font-bold px-2 py-1 bg-black/50 rounded self-start line-clamp-2">
                    {img.caption || img.title || 'No caption'}
                  </span>
                  <button onClick={() => handlePhotoDelete(img.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full self-end shadow-lg transition-colors">
                    <HiTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          {displayPhotos.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No photos uploaded to this event yet.
            </div>
          )}
        </>
      )}

      {/* CREATE EVENT MODAL */}
      <Modal isOpen={isEventModalOpen} onClose={() => setEventModalOpen(false)} title="Create New Event">
        <form onSubmit={handleEventSubmit} className="space-y-4">
          <ImageUpload value={eventFormData.cover_image} onChange={(url) => setEventFormData({...eventFormData, cover_image: url})} bucketFolder="gallery_events" />
          <div>
            <label className="block text-sm text-gray-400 mb-1">Event Title</label>
            <input type="text" required value={eventFormData.title} onChange={e => setEventFormData({...eventFormData, title: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input type="date" value={eventFormData.event_date} onChange={e => setEventFormData({...eventFormData, event_date: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <input type="text" value={eventFormData.location} onChange={e => setEventFormData({...eventFormData, location: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea required rows={3} value={eventFormData.description} onChange={e => setEventFormData({...eventFormData, description: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
          </div>
          <button type="submit" disabled={!eventFormData.cover_image} className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark disabled:opacity-50 font-bold py-3 rounded-lg mt-4 transition-colors">
            Save Event
          </button>
        </form>
      </Modal>

      {/* UPLOAD PHOTO MODAL */}
      <Modal isOpen={isPhotoModalOpen} onClose={() => setPhotoModalOpen(false)} title="Upload Photo">
        <form onSubmit={handlePhotoSubmit} className="space-y-4">
          <ImageUpload value={photoFormData.image_url} onChange={(url) => setPhotoFormData({...photoFormData, image_url: url})} bucketFolder="gallery" />
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title (Optional)</label>
            <input type="text" value={photoFormData.title} onChange={e => setPhotoFormData({...photoFormData, title: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Caption / Story Excerpt</label>
            <textarea rows={2} value={photoFormData.caption} onChange={e => setPhotoFormData({...photoFormData, caption: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
          </div>
          {!activeEvent && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Legacy Category (Optional)</label>
              <select value={photoFormData.category} onChange={e => setPhotoFormData({...photoFormData, category: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
          <button type="submit" disabled={!photoFormData.image_url} className="w-full bg-brand-green hover:bg-brand-lightGreen text-white disabled:opacity-50 font-bold py-3 rounded-lg mt-4 transition-colors">
            Upload & Save Photo
          </button>
        </form>
      </Modal>
    </div>
  );
}
