import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Images } from '../data/images';
import { FaShieldAlt, FaUsers, FaHeart, FaTrophy, FaHandshake, FaGlobeAfrica, FaDumbbell } from 'react-icons/fa';

const stats = [
  { value: '100+', label: 'Athletes Mentored' },
  { value: '20+', label: 'Community Events' },
  { value: '5+', label: 'Competitions' },
  { value: '1000+', label: 'Lives Impacted' },
];

const timeline = [
  { year: '2022', desc: 'Founded by Meru Prison staff' },
  { year: '2023', desc: 'Launched Community Outreach Programs' },
  { year: '2024', desc: 'Inaugural 42KM Mental Health Walk' },
  { year: '2025', desc: 'Competitive Expansion & Growth' },
];

const features = [
  { icon: <FaDumbbell />, title: 'Professional Coaching', desc: 'High-level training and discipline.' },
  { icon: <FaShieldAlt />, title: 'Structured Programs', desc: 'Consistent athletic development.' },
  { icon: <FaUsers />, title: 'Strong Team Culture', desc: 'Unity and respect above all.' },
  { icon: <FaTrophy />, title: 'Regular Competition', desc: 'Testing our limits in tournaments.' },
  { icon: <FaGlobeAfrica />, title: 'Community Outreach', desc: 'Giving back to the vulnerable.' },
  { icon: <FaHeart />, title: 'Mental Health', desc: 'Advocating for mental well-being.' },
];

export default function About() {
  return (
    <div className="overflow-hidden bg-brand-dark min-h-screen">
      {/* A. HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-green/40 z-10" />
          <img 
            src={Images.hero.main} 
            alt="Meru Prison Stars Training" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1 glass border border-brand-gold/30 rounded-full text-brand-gold text-xs sm:text-sm font-bold mb-6 uppercase tracking-widest">
              Who We Are
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Meru Prison Stars <br className="hidden sm:block" />
              <span className="text-brand-gold">Volleyball Club</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium drop-shadow-md">
              Discipline. Unity. Transformation Through Sport.
            </p>
          </motion.div>
        </div>
      </section>

      {/* B. CLUB STORY */}
      <section className="py-16 md:py-24 relative z-10 -mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 sm:p-10 md:p-16 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green via-brand-gold to-brand-green" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Our Story</h2>
            <div className="space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              <p>
                Founded in 2022 by staff of Meru Prison, the <strong className="text-white">Meru Prison Stars Volleyball Club</strong> was established to use sport as a tool for discipline, rehabilitation, mentorship, and community transformation.
              </p>
              <p>
                Based in Meru County and training at the Meru Prison Open Grounds, the club has grown from a simple recreational outlet into a structured, competitive volleyball program focused heavily on both athletic performance and character development.
              </p>
              <div className="bg-black/30 p-6 rounded-xl border border-white/5 mt-8">
                <h3 className="text-brand-gold font-bold mb-4 uppercase tracking-wider text-sm">Populations We Serve</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white font-medium">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-brand-green" /> Youth (Men & Women)</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-brand-green" /> Inmates</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-brand-green" /> Prison Staff</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-brand-green" /> Local Community</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* C. WHAT MAKES US DIFFERENT */}
      <section className="py-16 md:py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">The Stars Standard</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">What makes our program different from the rest.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-brand-gold/30 hover:bg-white/5 transition-all group"
              >
                <div className="text-brand-gold text-3xl mb-6 group-hover:scale-110 transition-transform origin-left">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* D. IMPACT STATS & E. TIMELINE */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/40 p-6 sm:p-8 rounded-3xl border border-brand-green/20 text-center shadow-xl"
                >
                  <div className="text-3xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-brand-gold font-bold uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Our Journey</h2>
              <div className="space-y-8">
                {timeline.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 sm:gap-6 items-start relative"
                  >
                    {idx !== timeline.length - 1 && (
                      <div className="absolute left-6 sm:left-8 top-12 bottom-[-2rem] w-px bg-gradient-to-b from-brand-gold/50 to-transparent" />
                    )}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full bg-brand-dark border-2 border-brand-gold flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10 text-sm sm:text-base">
                      {item.year}
                    </div>
                    <div className="pt-2 sm:pt-4">
                      <p className="text-lg sm:text-xl text-gray-200 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* F. TRAINING GROUNDS & G. COMMUNITY */}
      <section className="py-16 md:py-24 bg-black/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Beyond The Net</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">Where we train and how we give back.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
            >
              <img src={Images.campaigns.magunasWalk} alt="Training Grounds" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 block w-fit">Headquarters</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Meru Prison Open Grounds</h3>
                <p className="text-gray-300 line-clamp-2">The fortress where discipline is forged and talent is honed daily.</p>
              </div>
            </motion.div>

            <div className="grid grid-rows-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img src={Images.outreach.kithoka} alt="Kithoka Children's Home" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2 block">Community Highlight</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Kithoka Children's Home</h3>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img src={Images.campaigns.isioloWalk} alt="42KM Mental Health Walk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2 block">Major Campaign</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">42KM Mental Health Walk</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* H. CALL TO ACTION */}
      <section className="py-20 md:py-32 relative text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-green/10 to-brand-dark -z-10" />
        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8">Be Part of the Story</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          Whether you want to play, volunteer, or support our community outreach initiatives, there is a place for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link to="/team" className="bg-brand-green hover:bg-brand-lightGreen text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105">
            Meet The Team
          </Link>
          <Link to="/donate" className="bg-brand-gold hover:bg-yellow-500 text-brand-dark px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105">
            Support Our Mission
          </Link>
          <Link to="/contact" className="glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all border border-white/20 hover:scale-105">
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
