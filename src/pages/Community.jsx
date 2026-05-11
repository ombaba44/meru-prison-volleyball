import { motion } from 'framer-motion';

export default function Community() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Community Outreach</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Impacting lives beyond the prison walls. We are dedicated to youth mentorship, volunteering, and giving back.
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* Project 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="aspect-video bg-slate-800 rounded-2xl border border-white/10"></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-4">Kithoka Children's Home</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Our team spent a day at Kithoka Children's Home, bringing not just food and supplies, but joy, mentorship, and love. We played volleyball, shared stories, and inspired the youth to pursue their dreams despite their circumstances.
              </p>
              <div className="flex gap-4">
                <span className="glass px-4 py-2 rounded-full text-sm text-brand-gold">Mentorship</span>
                <span className="glass px-4 py-2 rounded-full text-sm text-brand-blue">Donation</span>
              </div>
            </motion.div>
          </div>

          {/* Project 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:order-2">
              <div className="aspect-video bg-slate-800 rounded-2xl border border-white/10"></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:order-1">
              <h2 className="text-3xl font-bold text-white mb-4">Youth Volleyball Clinics</h2>
              <p className="text-gray-300 mb-6 text-lg">
                We regularly host free volleyball clinics for local youth in Meru. These sessions are designed to teach fundamentals of the sport while instilling discipline and teamwork.
              </p>
              <div className="flex gap-4">
                <span className="glass px-4 py-2 rounded-full text-sm text-brand-orange">Sports</span>
                <span className="glass px-4 py-2 rounded-full text-sm text-white">Education</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
