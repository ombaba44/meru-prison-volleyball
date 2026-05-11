import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTrophy, FaHandHoldingHeart, FaWalking, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-dark">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10" />
          {/* Placeholder for volleyball hero image */}
          <div className="w-full h-full bg-slate-800 opacity-50 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)' }} />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building Champions <br/><span className="text-brand-orange">Beyond the Court</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 text-lg leading-relaxed max-w-2xl">
              Rehabilitation through sports, championing mental health awareness, and empowering the youth in Meru, Kenya.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30">
                Donate Now
              </Link>
              <Link to="/team" className="glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
                Meet The Team
              </Link>
              <Link to="/campaigns" className="text-white px-8 py-4 rounded-full font-bold hover:text-brand-orange transition-colors flex items-center gap-2">
                Join The Movement &rarr;
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
                className="glass-card p-6 text-center"
              >
                <div className="text-brand-orange text-3xl mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.count}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kithoka Children's Home Highlight */}
      <section className="py-24 bg-brand-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">Giving Back to the Community</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Kithoka Children's Home Visit</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Beyond volleyball, we are committed to uplifting our community. Our recent visit to Kithoka Children's Home was filled with mentorship, donation of essential supplies, and playing games with the kids. 
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We believe that spending time with these children, encouraging them, and showing them that they are loved is just as important as the items we donated.
              </p>
              <Link to="/community" className="text-brand-orange font-bold hover:text-white transition-colors flex items-center gap-2">
                Read Full Story &rarr;
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass p-2">
                <div className="w-full h-full bg-slate-800 rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)' }} />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-6 max-w-xs">
                <p className="text-white italic">"The smiles on their faces are our greatest victory."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mental Health 42KM Walk */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-brand-blue/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1 glass rounded-full text-brand-gold text-sm font-bold mb-6">Major Campaign</div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">42 Kilometers for<br/>Mental Health</h2>
            <p className="text-xl text-gray-300 mb-10">
              A grueling walk from Meru Town to Isiolo to break the stigma, build resilience, and champion healing through sports.
            </p>
            <Link to="/campaigns" className="inline-block bg-brand-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-500/30">
              Explore The Campaign
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
