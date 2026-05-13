import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { HiX, HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineBriefcase } from 'react-icons/hi';
import { Images } from '../data/images';

const SkeletonCard = () => (
  <div className="glass p-4 rounded-2xl animate-pulse">
    <div className="w-full h-64 bg-white/5 rounded-xl mb-4"></div>
    <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-white/10 rounded w-1/2"></div>
  </div>
);

export default function Team() {
  const [data, setData] = useState({ players: [], staff: [], gallery: [] });
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // { type: 'player'|'staff'|'gallery', item: obj }

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const [playersRes, staffRes, galleryRes] = await Promise.all([
          supabase.from('players').select('*').order('created_at', { ascending: true }),
          supabase.from('staff').select('*').order('created_at', { ascending: true }),
          supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(8)
        ]);

        setData({
          players: playersRes.data || [],
          staff: staffRes.data || [],
          gallery: galleryRes.data || []
        });
      } catch (error) {
        console.error('Error fetching club data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, []);

  const groupedStaff = data.staff.reduce((acc, curr) => {
    const cat = curr.category || 'support';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, { technical: [], management: [], support: [], development: [] });

  const closeModal = () => setActiveModal(null);

  return (
    <div className="overflow-hidden bg-brand-dark min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-brand-dark">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-green/30 z-10" />
          <div className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${Images.hero.main})` }} />
        </div>
        <div className="relative z-20 w-full px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-1 glass border border-brand-gold/30 rounded-full text-brand-gold text-xs sm:text-sm font-bold mb-4 uppercase tracking-widest">
              Club Structure
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              Meru Prison Stars
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto drop-shadow-lg">
              Discipline. Unity. Transformation Through Sport.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. CLUB STATS DASHBOARD */}
      <section className="relative z-30 -mt-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Players', value: data.players.length, icon: <HiOutlineUserGroup /> },
            { label: 'Technical Staff', value: groupedStaff.technical.length, icon: <HiOutlineBriefcase /> },
            { label: 'Total Personnel', value: data.players.length + data.staff.length, icon: <HiOutlineShieldCheck /> },
            { label: 'Years Active', value: '2022+', icon: <HiOutlineSparkles /> }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass p-6 rounded-2xl border border-brand-green/20 text-center shadow-xl backdrop-blur-xl">
              <div className="text-brand-gold text-2xl mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{loading ? '-' : stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. CLUB STRUCTURE OVERVIEW */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Organizational Hierarchy</h2>
        <div className="flex flex-col items-center space-y-6">
          <div className="glass px-8 py-4 rounded-xl border border-brand-gold/50 text-brand-gold font-bold w-full max-w-xs shadow-[0_0_15px_rgba(249,115,22,0.2)]">Club Leadership</div>
          <div className="w-px h-8 bg-brand-gold/50"></div>
          <div className="glass px-8 py-4 rounded-xl border border-white/20 text-white font-bold w-full max-w-xs">Technical Team</div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="glass px-8 py-4 rounded-xl border border-white/20 text-white font-bold w-full max-w-xs bg-brand-green/10">Active Players</div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="glass px-8 py-4 rounded-xl border border-white/10 text-gray-300 font-bold">Support Staff</div>
            <div className="glass px-8 py-4 rounded-xl border border-white/10 text-gray-300 font-bold">Development & Outreach</div>
          </div>
        </div>
      </section>

      {/* 3. PLAYERS ROSTER */}
      <section className="py-16 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">First Team Roster</h2>
            <p className="text-gray-400">The athletes defending the badge.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />) : data.players.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveModal({ type: 'player', item: player })}
                className="group cursor-pointer glass rounded-3xl overflow-hidden border border-white/5 hover:border-brand-gold/40 transition-all hover:-translate-y-2 shadow-2xl relative"
              >
                <div className="aspect-[3/4] bg-brand-dark relative overflow-hidden">
                  <img src={player.image_url || player.image} alt={player.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-brand-green text-brand-dark font-black text-xl px-3 py-1 rounded-lg shadow-lg">
                    #{player.jersey_number || player.number}
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{player.name}</h3>
                    <p className="text-gray-300 font-medium text-sm tracking-wider uppercase">{player.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STAFF SYSTEM */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical & Support Staff</h2>
            <p className="text-gray-400">The minds behind the operation.</p>
          </div>

          <div className="space-y-20">
            {Object.entries(groupedStaff).map(([category, staffList]) => {
              if (staffList.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="text-2xl font-bold text-brand-gold mb-8 capitalize border-b border-white/10 pb-4 inline-block">{category} Team</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staffList.map((member, i) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setActiveModal({ type: 'staff', item: member })}
                        className="group cursor-pointer glass p-6 rounded-3xl border border-white/5 hover:border-brand-green/40 transition-all flex items-center gap-6"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden border-2 border-brand-green/30 group-hover:border-brand-gold transition-colors">
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                          <p className="text-brand-green text-sm font-bold mb-1">{member.role}</p>
                          {member.department && <p className="text-gray-400 text-xs">{member.department}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TEAM MOMENTS GALLERY */}
      <section className="py-20 bg-black/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Inside the Camp</h2>
            <p className="text-gray-400">Behind the scenes with the stars.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {loading ? Array(8).fill(0).map((_, i) => <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-xl"></div>) : data.gallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveModal({ type: 'gallery', item: img })}
                className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
              >
                <img src={img.image_url} alt="Team Moment" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL MODAL SYSTEM */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-brand-dark rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-brand-gold hover:text-black text-white rounded-full transition-colors backdrop-blur-md">
                <HiX size={20} />
              </button>

              {activeModal.type === 'player' && (
                <>
                  <div className="md:w-1/2 aspect-[3/4] md:aspect-auto relative bg-black">
                    <img src={activeModal.item.image_url || activeModal.item.image} alt={activeModal.item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent md:hidden" />
                    <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark font-black text-3xl px-4 py-2 rounded-xl">
                      #{activeModal.item.jersey_number || activeModal.item.number}
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center overflow-y-auto">
                    <p className="text-brand-green font-bold uppercase tracking-widest mb-2">{activeModal.item.position}</p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{activeModal.item.name}</h2>
                    <div className="w-12 h-1 bg-brand-gold mb-8" />
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">{activeModal.item.bio}</p>
                    {activeModal.item.quote && (
                      <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-brand-gold">
                        <p className="text-white italic">"{activeModal.item.quote}"</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeModal.type === 'staff' && (
                <div className="w-full p-8 sm:p-12 text-center overflow-y-auto">
                  <img src={activeModal.item.image_url} alt={activeModal.item.name} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover mx-auto mb-6 border-4 border-brand-green/30" />
                  <p className="text-brand-gold font-bold uppercase tracking-widest mb-2">{activeModal.item.role}</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{activeModal.item.name}</h2>
                  {activeModal.item.experience && <p className="text-gray-400 font-medium mb-6 inline-block bg-white/5 px-4 py-1 rounded-full">{activeModal.item.experience}</p>}
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">{activeModal.item.bio}</p>
                </div>
              )}

              {activeModal.type === 'gallery' && (
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 min-h-[50vh] bg-black flex items-center justify-center p-4">
                    <img src={activeModal.item.image_url} alt="" className="max-w-full max-h-full object-contain rounded-lg" />
                  </div>
                  {(activeModal.item.caption || activeModal.item.title) && (
                    <div className="p-6 bg-brand-dark border-t border-white/5 text-center">
                      <p className="text-white text-lg">{activeModal.item.caption || activeModal.item.title}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
