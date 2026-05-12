import { motion } from 'framer-motion';
import { events } from '../data/mockData';

export default function NewsEvents() {
  return (
    <div className="pt-10 pb-24">
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

        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-48 shrink-0 text-center md:text-left">
                <div className="text-brand-gold font-bold">{event.date}</div>
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
        </div>
      </div>
    </div>
  );
}
