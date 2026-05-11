import { motion } from 'framer-motion';

export default function Donate() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Support Our Mission</h1>
          <p className="text-xl text-gray-300">
            Your contribution helps us fund outreach programs, buy sports equipment, and run mental health campaigns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 text-center border-t-4 border-t-green-500">
            <h3 className="text-2xl font-bold text-white mb-2">M-PESA</h3>
            <p className="text-gray-400 mb-6">For local donations</p>
            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-400 mb-1">Paybill Number</p>
              <p className="text-3xl font-bold text-white mb-4">000000</p>
              <p className="text-sm text-gray-400 mb-1">Account Number</p>
              <p className="text-xl font-bold text-white">Your Name</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 text-center border-t-4 border-t-blue-500">
            <h3 className="text-2xl font-bold text-white mb-2">PayPal / Stripe</h3>
            <p className="text-gray-400 mb-6">For international donations</p>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Donate with PayPal
              </button>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Donate with Card (Stripe)
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
