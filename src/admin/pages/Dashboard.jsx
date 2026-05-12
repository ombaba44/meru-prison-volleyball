import { motion } from 'framer-motion';
import { HiUsers, HiPhotograph, HiHeart, HiCurrencyDollar } from 'react-icons/hi';
import { usePlayersStore, useGalleryStore, useOutreachStore, useDonationsStore } from '../store';

export default function Dashboard() {
  const players = usePlayersStore((state) => state.players);
  const gallery = useGalleryStore((state) => state.images);
  const outreach = useOutreachStore((state) => state.outreach);
  const donations = useDonationsStore((state) => state.donations);
  const goal = useDonationsStore((state) => state.goal);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const donationProgress = Math.min(100, Math.round((totalDonations / goal) * 100));

  const stats = [
    { title: 'Total Players', value: players.length, icon: HiUsers, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Gallery Uploads', value: gallery.length, icon: HiPhotograph, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Outreach Projects', value: outreach.length, icon: HiHeart, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { title: 'Donations (Ksh)', value: totalDonations.toLocaleString(), icon: HiCurrencyDollar, color: 'text-brand-green', bg: 'bg-brand-green/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back to the CMS.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-accent/50 border border-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 font-medium text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-accent/50 border border-white/5 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-white mb-6">Donation Goal Progress</h3>
          <div className="mb-2 flex justify-between text-sm text-gray-400">
            <span>Ksh {totalDonations.toLocaleString()} raised</span>
            <span>Goal: Ksh {goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-brand-dark rounded-full h-4 overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${donationProgress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-brand-gold rounded-full"
            />
          </div>
          <p className="text-right text-brand-gold font-bold mt-2">{donationProgress}%</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-accent/50 border border-white/5 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-white mb-6">Recent Players</h3>
          <div className="space-y-4">
            {players.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center gap-4 bg-brand-dark/50 p-3 rounded-xl border border-white/5">
                <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />
                <div>
                  <p className="text-white font-bold">{p.name}</p>
                  <p className="text-gray-400 text-xs">{p.position} • #{p.number}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
