import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our mission is to foster rehabilitation, mental health awareness, and youth empowerment through the spirit of volleyball.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-brand-gold mb-6">Our History</h2>
            <p className="text-gray-300 text-lg mb-6">
              Founded within the walls of Meru Prison, the volleyball club started as a small initiative to provide inmates with an outlet for physical activity and teamwork.
            </p>
            <p className="text-gray-300 text-lg mb-6">
              Over the years, it has grown into a beacon of hope, demonstrating that rehabilitation is possible and that sports can heal the mind and soul.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Our Core Values</h2>
            <ul className="space-y-4">
              {[
                { title: "Resilience", desc: "Bouncing back from life's toughest challenges." },
                { title: "Community", desc: "Uplifting those around us, especially the youth." },
                { title: "Awareness", desc: "Breaking the stigma around mental health." },
                { title: "Discipline", desc: "Fostering focus and dedication on and off the court." },
              ].map((val, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-brand-green shrink-0" />
                  <div>
                    <h3 className="text-white font-bold">{val.title}</h3>
                    <p className="text-gray-400">{val.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
