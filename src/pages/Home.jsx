import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTrophy, FaHandHoldingHeart, FaWalking, FaUsers } from 'react-icons/fa';
import { Images } from '../data/images';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-dark">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${Images.hero.main})` }} />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1 glass border border-brand-gold/30 rounded-full text-brand-gold text-sm font-bold mb-6 uppercase tracking-widest backdrop-blur-md">
              Meru Prison Stars
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Building Champions<br/><span className="text-brand-gold">Beyond the Court</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
              Rehabilitation through sports, championing mental health awareness, and empowering the youth in Meru, Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="bg-brand-green hover:bg-brand-lightGreen text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 text-lg">
                Support the Team
              </Link>
              <Link to="/contact" className="glass hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 backdrop-blur-md text-lg">
                Join The Movement
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-30 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaTrophy/>, count: "3", label: "Championships" },
              { icon: <FaUsers/>, count: "150+", label: "Youth Mentored" },
              { icon: <FaHandHoldingHeart/>, count: "24", label: "Outreach Events" },
              { icon: <FaWalking/>, count: "42km", label: "Awareness Walked" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center border border-brand-green/20"
              >
                <div className="text-brand-gold text-3xl mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.count}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kithoka Children's Home Highlight */}
      <section className="py-16 md:py-24 bg-brand-accent/30 relative">
        <div className="absolute left-0 top-0 w-1/3 h-full bg-brand-green/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-brand-gold uppercase tracking-widest mb-3">Giving Back to the Community</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Kithoka Children's Home Visit</h3>
              <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                Beyond volleyball, we are committed to uplifting our community. Our recent visit to Kithoka Children's Home was filled with mentorship, donation of essential supplies, and playing games with the kids. 
              </p>
              <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                We believe that spending time with these children, encouraging them, and showing them that they are loved is just as important as the items we donated.
              </p>
              <Link to="/community" className="text-brand-gold font-bold hover:text-white transition-colors flex items-center gap-2">
                Read Full Story &rarr;
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mt-8 md:mt-0"
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass p-2 w-full max-w-sm sm:max-w-md mx-auto md:max-w-none">
                <div className="w-full h-full bg-slate-800 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${Images.outreach.kithoka})` }} />
              </div>
              <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-left-8 glass-card p-4 sm:p-6 max-w-[250px] sm:max-w-xs border-l-4 border-l-brand-gold">
                <p className="text-white italic text-sm sm:text-base">"The smiles on their faces are our greatest victory."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mental Health 42KM Walk */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-brand-green/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-transparent opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1 glass border border-brand-gold/30 rounded-full text-brand-gold text-sm font-bold mb-6">Major Campaign</div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">42 Kilometers for<br/>Mental Health</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              A grueling walk from Meru Town to Isiolo to break the stigma, build resilience, and champion healing through sports.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="group relative overflow-hidden rounded-2xl aspect-video border border-white/10 shadow-2xl">
                <img src={Images.campaigns.magunasWalk} alt="Meeting at Magunas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-1">Starting Point</p>
                  <p className="text-white font-medium">Meeting at Magunas for the Walk</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl aspect-video border border-white/10 shadow-2xl md:mt-12">
                <img src={Images.campaigns.isioloWalk} alt="Final Destination Isiolo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-1">The Goal</p>
                  <p className="text-white font-medium">Final Destination: Isiolo</p>
                </div>
              </div>
            </div>

            <Link to="/campaigns" className="inline-block bg-brand-gold hover:bg-yellow-500 text-brand-dark px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-gold/30">
              Explore The Campaign
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
