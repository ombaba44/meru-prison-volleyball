import { motion } from 'framer-motion';

export default function AdminPlaceholder() {
  return (
    <div className="pt-10 pb-24 min-h-[60vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">
          This is a placeholder for the future admin area. Authentication and backend integration will be added here.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="w-16 h-16 rounded-full border-4 border-brand-green border-t-brand-gold animate-spin"></div>
        </div>
      </motion.div>
    </div>
  );
}
