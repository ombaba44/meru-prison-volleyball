import { motion } from 'framer-motion';
import { players } from '../data/mockData';

export default function Team() {
  return (
    <div className="pt-10 pb-24">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-64 bg-slate-800 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10" />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="text-5xl font-bold text-white/20 absolute -top-8 -left-2">{player.number}</div>
                  <h3 className="text-2xl font-bold text-white relative z-10">{player.name}</h3>
                  <p className="text-brand-orange font-medium">{player.position}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{player.bio}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-gray-400 italic">"{player.quote}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
