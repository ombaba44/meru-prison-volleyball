import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

export default function Community() {
  const [outreach, setOutreach] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutreach = async () => {
      try {
        const { data, error } = await supabase
          .from('outreach')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        if (data) setOutreach(data);
      } catch (error) {
        console.error('Error fetching outreach:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOutreach();
  }, []);

  return (
    <div className="pt-10 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Community Outreach</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Impacting lives beyond the prison walls. We are dedicated to youth mentorship, volunteering, and giving back.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-green border-t-brand-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-24">
            {outreach.map((item, index) => (
              <div key={item.id} className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  className={index % 2 !== 0 ? 'md:order-2' : ''}
                >
                  <div className="aspect-video bg-brand-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/50 flex items-center justify-center text-gray-500">No Image</div>
                    )}
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  className={index % 2 !== 0 ? 'md:order-1' : ''}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">{item.title}</h2>
                  {item.location && <p className="text-brand-gold font-medium mb-4">{item.location}</p>}
                  <p className="text-gray-300 mb-6 text-lg">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="glass px-4 py-2 rounded-full text-sm text-brand-gold">Community</span>
                    <span className="glass px-4 py-2 rounded-full text-sm text-white">Impact</span>
                  </div>
                </motion.div>
              </div>
            ))}

            {outreach.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No community outreach projects found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
