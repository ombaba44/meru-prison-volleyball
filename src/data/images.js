// src/data/images.js

// Centralized image structure. Update paths here when real assets are added.
export const Images = {
  hero: {
    // Preserve the Mikasa volleyball background aesthetic from the original homepage
    main: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  },
  logos: {
    // Placeholder links for Kenya Prison & Meru Prison VB
    prisonEmblem: 'https://placehold.co/150x150/1a472a/white?text=KPS',
    teamLogo: 'https://placehold.co/150x150/f97316/white?text=MPVT',
    favicon: 'https://placehold.co/32x32/1a472a/white?text=MP',
  },
  players: [
    { id: 1, src: 'https://placehold.co/400x500/1e293b/white?text=Player+1' },
    { id: 2, src: 'https://placehold.co/400x500/1e293b/white?text=Player+2' },
    { id: 3, src: 'https://placehold.co/400x500/1e293b/white?text=Player+3' },
  ],
  outreach: {
    kithoka: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    clinic: 'https://placehold.co/800x450/1e293b/white?text=Volleyball+Clinic',
  },
  campaigns: {
    mentalHealthWalk: 'https://placehold.co/1200x600/1a472a/white?text=42KM+Mental+Health+Walk',
  },
  gallery: [
    { id: 1, category: 'Matches', src: 'https://placehold.co/600x600/1e293b/white?text=Match+1' },
    { id: 2, category: 'Outreach', src: 'https://placehold.co/600x600/1e293b/white?text=Outreach+1' },
    { id: 3, category: 'Mental Health Walk', src: 'https://placehold.co/600x600/1e293b/white?text=Walk+1' },
    { id: 4, category: 'Training', src: 'https://placehold.co/600x600/1e293b/white?text=Training+1' },
    { id: 5, category: 'Community Events', src: 'https://placehold.co/600x600/1e293b/white?text=Event+1' },
    { id: 6, category: 'Matches', src: 'https://placehold.co/600x600/1e293b/white?text=Match+2' },
  ]
};
