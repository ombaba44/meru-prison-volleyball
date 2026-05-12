import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Donate() {
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [mpesaAmount, setMpesaAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleMpesaSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Placeholder for future STK Push logic
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 inline-block">Empower Through Giving</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Support Our Mission</h1>
          <p className="text-xl text-gray-300">
            Your contribution helps us fund outreach programs, buy sports equipment, and run mental health campaigns.
          </p>
        </motion.div>

        {/* Donation Goal Progress Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-12"
        >
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-white">Monthly Goal: Ksh 100,000</span>
            <span className="text-brand-gold">65% Raised</span>
          </div>
          <div className="w-full bg-brand-dark rounded-full h-4 mb-4 overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="bg-brand-gold h-4 rounded-full"
            />
          </div>
          <p className="text-gray-400 text-sm text-center">Help us reach our target to fund the next youth clinic!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="glass-card p-8 border-t-4 border-t-brand-lightGreen relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-brand-lightGreen/10 rounded-full blur-xl" />
            <h3 className="text-2xl font-bold text-white mb-2">M-PESA Express</h3>
            <p className="text-gray-400 mb-6">Instant local donation via STK Push</p>
            
            <form onSubmit={handleMpesaSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number (254...)</label>
                <input 
                  type="text" 
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-lightGreen transition-colors" 
                  placeholder="254700000000"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Amount (Ksh)</label>
                <input 
                  type="number" 
                  value={mpesaAmount}
                  onChange={(e) => setMpesaAmount(e.target.value)}
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-lightGreen transition-colors" 
                  placeholder="1000"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-brand-lightGreen hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Donate via M-PESA'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-center text-gray-400">Or use Paybill: <strong className="text-white">000000</strong></p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="glass-card p-8 border-t-4 border-t-brand-blue"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Global Support</h3>
            <p className="text-gray-400 mb-6">For international contributors</p>
            <div className="space-y-4">
              <button className="w-full bg-[#00457C] hover:bg-[#0079C1] text-white font-bold py-4 px-4 rounded-lg transition-colors shadow-lg">
                Donate with PayPal
              </button>
              <button className="w-full bg-[#635BFF] hover:bg-[#544ee0] text-white font-bold py-4 px-4 rounded-lg transition-colors shadow-lg">
                Donate with Card (Stripe)
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 italic">"Every contribution builds a champion."</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal Placeholder */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-accent p-8 rounded-2xl max-w-sm w-full text-center border border-white/10 shadow-2xl"
            >
              <div className="w-16 h-16 bg-brand-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Request Sent!</h2>
              <p className="text-gray-300 mb-6">Please check your phone and enter your M-PESA PIN to complete the donation.</p>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2 bg-brand-green hover:bg-brand-lightGreen text-white font-medium rounded-lg transition-colors"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
