import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

export default function NewsEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: false });
          
        if (error) throw error;
        if (data) setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="pt-10 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">News & Events</h1>
          <p className="text-xl text-gray-300">
            Stay updated with our latest tournaments, campaigns, and outreach stories.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-green border-t-brand-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col md:flex-row gap-8 items-center border border-white/5 hover:border-brand-green/50 transition-colors"
              >
                <div className="w-full md:w-48 shrink-0 text-center md:text-left">
                  <div className="text-brand-gold font-bold">{new Date(event.date).toLocaleDateString()}</div>
                  <div className="text-gray-400 text-sm mt-1">{event.location}</div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400">{event.description}</p>
                </div>
                <div className="shrink-0">
                  <button className="px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-green hover:text-white rounded-full transition-colors">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No upcoming events scheduled yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
