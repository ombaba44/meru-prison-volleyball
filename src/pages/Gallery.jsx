import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images } from '../data/images';

const categories = ['All', 'Matches', 'Outreach', 'Mental Health Walk', 'Training', 'Community Events'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? Images.gallery 
    : Images.gallery.filter(img => img.category === activeCategory);

  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Moments captured on the court and in the community.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-brand-gold text-brand-dark' 
                  : 'bg-brand-green/20 text-gray-300 hover:bg-brand-green/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="aspect-square bg-brand-dark rounded-xl overflow-hidden group relative shadow-lg shadow-black/20"
              >
                <img src={img.src} alt={img.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-brand-gold text-brand-dark px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
