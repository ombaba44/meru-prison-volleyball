import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let data;
      const text = await res.text();
      
      try {
        data = JSON.parse(text);
      } catch (err) {
        // This usually happens in local Vite dev because Vercel Serverless Functions 
        // aren't executed by default Vite. It returns index.html instead.
        if (text.includes('<!DOCTYPE html>')) {
          throw new Error('Local dev environment detected. Vercel Serverless Functions (/api/*) require "vercel dev" or a deployed production environment to execute. Your form will work perfectly in production!');
        }
        throw new Error('Server returned an invalid response.');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-dark relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-green/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 glass border border-brand-gold/30 rounded-full text-brand-gold text-sm font-bold mb-4 uppercase tracking-widest">
            Reach Out
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch for partnerships, donations, or volunteering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold text-brand-gold mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" 
                  placeholder="Your Name" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-gold mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-gold mb-2">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" 
                  placeholder="What is this regarding?" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-gold mb-2">Message</label>
                <textarea 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all resize-none" 
                  placeholder="How can we help?"
                />
              </div>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-sm font-medium bg-red-900/30 p-3 rounded-lg border border-red-500/30">
                    Error: {errorMessage}
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-green-400 text-sm font-medium bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                    Message sent successfully! We will get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-green hover:bg-brand-lightGreen text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="glass p-8 rounded-2xl shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold text-brand-gold mb-4">Location</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Meru Prison Base<br/>
                Meru Town, Kenya
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold text-brand-gold mb-4">Join Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                We are always looking for partners, sponsors, and volunteers who believe in the power of rehabilitation through sports. Every message counts.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
