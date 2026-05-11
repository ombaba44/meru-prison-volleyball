import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300">
            We'd love to hear from you. Get in touch for partnerships, donations, or volunteering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-4">Location</h3>
              <p className="text-gray-400">Meru Prison Base<br/>Meru Town, Kenya</p>
            </div>
            {/* Map Placeholder */}
            <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center border border-white/10">
              <span className="text-gray-500 font-bold">Map Placeholder</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
