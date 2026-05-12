import { motion } from 'framer-motion';
import { useDonationsStore } from '../store';
import { HiTrendingUp, HiDownload } from 'react-icons/hi';

export default function Donations() {
  const { donations, goal } = useDonationsStore();
  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const progress = Math.min(100, Math.round((total / goal) * 100));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Donations Overview</h1>
        <button className="bg-brand-accent border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <HiDownload /> Export CSV
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-brand-accent/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-dark/30 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4">Donor</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{d.donorName}</td>
                    <td className="p-4 text-brand-gold font-bold">Ksh {d.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${d.method === 'M-PESA' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {d.method}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">{new Date(d.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="bg-brand-green/20 border border-brand-green/30 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-brand-green opacity-20"><HiTrendingUp size={100} /></div>
            <h3 className="text-lg font-medium text-brand-green mb-2 relative z-10">Total Raised</h3>
            <div className="text-4xl font-bold text-white relative z-10">Ksh {total.toLocaleString()}</div>
          </div>

          <div className="bg-brand-accent/50 border border-white/5 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Monthly Goal</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-brand-gold font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-brand-dark rounded-full h-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${progress}%` }} 
                className="h-full bg-brand-gold rounded-full"
              />
            </div>
            <p className="text-center text-sm text-gray-400 mt-4">Goal: Ksh {goal.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
