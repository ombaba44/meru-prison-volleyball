import { motion } from 'framer-motion';
import { FaWalking, FaHeartbeat, FaBrain } from 'react-icons/fa';

export default function MentalHealth() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Mental Health Campaigns</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Healing through sports. Breaking the stigma.
          </p>
        </motion.div>

        {/* 42KM Walk Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden mb-20"
        >
          <div className="h-80 bg-brand-blue/20 relative flex items-center justify-center border-b border-white/10">
            <div className="absolute inset-0 bg-slate-900/60" />
            <div className="relative z-10 text-center px-4">
              <span className="bg-brand-gold text-brand-dark font-bold px-4 py-1 rounded-full text-sm mb-4 inline-block">Flagship Campaign</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">42 Kilometers for Mental Health</h2>
              <p className="text-xl text-white/80">From Meru Town (Magunas Supermarket) to Isiolo Town</p>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Our biggest initiative yet. The club, alongside community members, walked 42 kilometers to raise awareness for mental health. The journey was symbolic of the long, often difficult road to mental wellness, emphasizing that nobody has to walk it alone.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Along the route, we engaged with locals, distributed informational pamphlets, and shared stories of resilience and recovery.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-gold text-xl"><FaWalking /></div>
                  <div>
                    <div className="font-bold text-xl">42 KM</div>
                    <div className="text-sm text-gray-400">Distance Covered</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-blue text-xl"><FaBrain /></div>
                  <div>
                    <div className="font-bold text-xl">1000+</div>
                    <div className="text-sm text-gray-400">People Reached</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-gold text-xl"><FaHeartbeat /></div>
                  <div>
                    <div className="font-bold text-xl">Countless</div>
                    <div className="text-sm text-gray-400">Lives Touched</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
