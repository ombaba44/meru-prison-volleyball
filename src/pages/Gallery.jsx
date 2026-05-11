import { motion } from 'framer-motion';

export default function Gallery() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-xl text-gray-300">
            Moments captured on the court and in the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square bg-slate-800 rounded-lg overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/20 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold">View Image</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
