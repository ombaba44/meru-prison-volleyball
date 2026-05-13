import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { HiX, HiPhotograph, HiCalendar, HiLocationMarker } from 'react-icons/hi';

const EventStackCard = ({ event, onClick }) => {
  const images = event.images.slice(0, 5);
  const backgroundImages = images.slice(1);

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative cursor-pointer group mb-12 md:mb-0"
      onClick={() => onClick(event)}
    >
      <div className="relative aspect-[4/3] w-full z-0">
        {backgroundImages.map((img, index) => {
          const rotation = index % 2 === 0 ? (index + 1) * 3 : -(index + 1) * 3;
          const yOffset = (index + 1) * 8;
          const scale = 1 - (index + 1) * 0.05;
          return (
            <motion.div
              key={img.id}
              className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/10"
              style={{ zIndex: backgroundImages.length - index }}
              variants={{
                initial: { rotate: 0, y: yOffset, scale: scale },
                hover: { rotate: rotation, y: yOffset - 10, scale: scale + 0.02 }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img src={img.image_url} alt="" className="w-full h-full object-cover opacity-40 brightness-50" />
            </motion.div>
          );
        })}

        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-brand-green/30 z-10 bg-brand-dark"
          variants={{
            initial: { y: 0, scale: 1 },
            hover: { y: -15, scale: 1.02 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-brand-gold text-brand-dark px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <HiPhotograph size={14} /> {event.images.length} Photos
              </span>
              {event.event_date && (
                <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
                  <HiCalendar size={14} /> {new Date(event.event_date).toLocaleDateString()}
                </span>
              )}
              {event.location && (
                <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
                  <HiLocationMarker size={14} /> {event.location}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">{event.title}</h3>
            <p className="text-gray-300 text-sm line-clamp-2 drop-shadow">{event.description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const [eventsRes, galleryRes] = await Promise.all([
          supabase.from('gallery_events').select('*').order('created_at', { ascending: false }),
          supabase.from('gallery').select('*').order('created_at', { ascending: false })
        ]);

        if (eventsRes.error) throw eventsRes.error;
        if (galleryRes.error) throw galleryRes.error;

        const allEvents = [];
        const rawEvents = eventsRes.data || [];
        const rawPhotos = galleryRes.data || [];

        // Build actual events
        for (const ev of rawEvents) {
          const eventPhotos = rawPhotos.filter(p => p.event_id === ev.id);
          allEvents.push({
            ...ev,
            images: eventPhotos
          });
        }

        // Build General Gallery from orphaned/legacy photos
        const orphanedPhotos = rawPhotos.filter(p => !p.event_id);
        if (orphanedPhotos.length > 0) {
          allEvents.push({
            id: 'general-gallery',
            title: 'General Gallery',
            description: 'A collection of moments captured on the court and in the community.',
            cover_image: orphanedPhotos[0].image_url,
            event_date: null,
            location: 'Meru, Kenya',
            images: orphanedPhotos
          });
        }

        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching gallery:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-dark relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-green/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1 glass border border-brand-gold/30 rounded-full text-brand-gold text-sm font-bold mb-4 uppercase tracking-widest">
            Media Archive
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Stories</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Relive the moments that define us. From intense matches on the court to impactful outreach in the community.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-green border-t-brand-gold rounded-full animate-spin"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
              >
                <EventStackCard event={event} onClick={setSelectedEvent} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-2xl max-w-lg mx-auto">
            <HiPhotograph className="mx-auto text-gray-500 mb-4" size={48} />
            <h3 className="text-xl text-white font-bold mb-2">No Stories Yet</h3>
            <p className="text-gray-400">Our gallery archive is currently empty.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="p-4 sm:p-6 flex justify-between items-center border-b border-white/10 bg-black/50 sticky top-0 z-10">
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-white mb-1">{selectedEvent.title}</h2>
                <p className="text-brand-gold text-sm font-medium">{selectedEvent.images.length} Photos</p>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <HiX size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-24 space-y-8 sm:space-y-16">
              <div className="max-w-4xl mx-auto space-y-8 sm:space-y-16">
                {selectedEvent.images.map((img, idx) => (
                  <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.1, 0.5) }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-brand-dark aspect-video">
                      <img 
                        src={img.image_url} 
                        alt={img.title || selectedEvent.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {(img.caption || img.title) && (
                      <p className="text-gray-300 text-center text-lg">{img.caption || img.title}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
