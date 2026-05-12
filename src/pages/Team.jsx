import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

export default function Team() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data, error } = await supabase
          .from('players')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        if (data) setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="pt-10 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Meet The Team</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The faces of resilience, dedication, and teamwork.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-green border-t-brand-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group border border-white/5"
              >
                <div className="h-64 bg-brand-dark relative">
                  <img src={player.image_url || player.image} alt={player.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="text-5xl font-bold text-white/20 absolute -top-8 -left-2">{player.jersey_number || player.number}</div>
                    <h3 className="text-2xl font-bold text-white relative z-10">{player.name}</h3>
                    <p className="text-brand-gold font-medium">{player.position}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4">{player.bio}</p>
                  {player.quote && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-sm text-gray-400 italic">"{player.quote}"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {players.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                No players have been added to the roster yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
