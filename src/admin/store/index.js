import { create } from 'zustand';
import { initialPlayers, initialGallery, initialOutreach, initialEvents, initialDonations } from '../data/mockData';
import { supabase } from '../../lib/supabaseClient';

export const usePlayersStore = create((set) => ({
  players: initialPlayers,
  fetchPlayers: async () => {
    try {
      const { data, error } = await supabase.from('players').select('*');
      if (!error && data) set({ players: data.length > 0 ? data : initialPlayers });
    } catch (e) { console.error(e); }
  },
  addPlayer: async (player) => {
    const { data, error } = await supabase.from('players').insert([player]).select();
    if (!error && data) set((state) => ({ players: [...state.players, data[0]] }));
    else set((state) => ({ players: [...state.players, { ...player, id: Date.now() }] }));
  },
  updatePlayer: async (id, updatedPlayer) => {
    const { data, error } = await supabase.from('players').update(updatedPlayer).eq('id', id).select();
    if (!error && data) set((state) => ({ players: state.players.map((p) => p.id === id ? data[0] : p) }));
    else set((state) => ({ players: state.players.map((p) => p.id === id ? { ...p, ...updatedPlayer } : p) }));
  },
  deletePlayer: async (id) => {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (!error) set((state) => ({ players: state.players.filter((p) => p.id !== id) }));
    else set((state) => ({ players: state.players.filter((p) => p.id !== id) }));
  }
}));

export const useGalleryEventsStore = create((set) => ({
  events: [],
  fetchEvents: async () => {
    try {
      const { data, error } = await supabase.from('gallery_events').select('*').order('created_at', { ascending: false });
      if (!error && data) set({ events: data });
    } catch (e) { console.error(e); }
  },
  addEvent: async (event) => {
    const { data, error } = await supabase.from('gallery_events').insert([event]).select();
    if (!error && data) set((state) => ({ events: [data[0], ...state.events] }));
  },
  updateEvent: async (id, updatedEvent) => {
    const { data, error } = await supabase.from('gallery_events').update(updatedEvent).eq('id', id).select();
    if (!error && data) set((state) => ({ events: state.events.map((e) => e.id === id ? data[0] : e) }));
  },
  deleteEvent: async (id) => {
    const { error } = await supabase.from('gallery_events').delete().eq('id', id);
    if (!error) set((state) => ({ events: state.events.filter((e) => e.id !== id) }));
  }
}));

export const useGalleryStore = create((set) => ({
  images: initialGallery,
  fetchGallery: async () => {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (!error && data) set({ images: data.length > 0 ? data : initialGallery });
    } catch (e) { console.error(e); }
  },
  addImage: async (image) => {
    const { data, error } = await supabase.from('gallery').insert([image]).select();
    if (!error && data) set((state) => ({ images: [data[0], ...state.images] }));
    else set((state) => ({ images: [{ ...image, id: Date.now() }, ...state.images] }));
  },
  deleteImage: async (id) => {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (!error) set((state) => ({ images: state.images.filter((img) => img.id !== id) }));
    else set((state) => ({ images: state.images.filter((img) => img.id !== id) }));
  }
}));

export const useOutreachStore = create((set) => ({
  outreach: initialOutreach,
  fetchOutreach: async () => {
    try {
      const { data, error } = await supabase.from('outreach').select('*');
      if (!error && data) set({ outreach: data.length > 0 ? data : initialOutreach });
    } catch (e) { console.error(e); }
  },
  addOutreach: async (item) => {
    const { data, error } = await supabase.from('outreach').insert([item]).select();
    if (!error && data) set((state) => ({ outreach: [...state.outreach, data[0]] }));
    else set((state) => ({ outreach: [...state.outreach, { ...item, id: Date.now() }] }));
  },
  updateOutreach: async (id, updated) => {
    const { data, error } = await supabase.from('outreach').update(updated).eq('id', id).select();
    if (!error && data) set((state) => ({ outreach: state.outreach.map((o) => o.id === id ? data[0] : o) }));
    else set((state) => ({ outreach: state.outreach.map((o) => o.id === id ? { ...o, ...updated } : o) }));
  },
  deleteOutreach: async (id) => {
    const { error } = await supabase.from('outreach').delete().eq('id', id);
    if (!error) set((state) => ({ outreach: state.outreach.filter((o) => o.id !== id) }));
    else set((state) => ({ outreach: state.outreach.filter((o) => o.id !== id) }));
  }
}));

export const useEventsStore = create((set) => ({
  events: initialEvents,
  fetchEvents: async () => {
    try {
      const { data, error } = await supabase.from('events').select('*');
      if (!error && data) set({ events: data.length > 0 ? data : initialEvents });
    } catch (e) { console.error(e); }
  },
  addEvent: async (item) => {
    const { data, error } = await supabase.from('events').insert([item]).select();
    if (!error && data) set((state) => ({ events: [...state.events, data[0]] }));
    else set((state) => ({ events: [...state.events, { ...item, id: Date.now() }] }));
  },
  updateEvent: async (id, updated) => {
    const { data, error } = await supabase.from('events').update(updated).eq('id', id).select();
    if (!error && data) set((state) => ({ events: state.events.map((e) => e.id === id ? data[0] : e) }));
    else set((state) => ({ events: state.events.map((e) => e.id === id ? { ...e, ...updated } : e) }));
  },
  deleteEvent: async (id) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) set((state) => ({ events: state.events.filter((e) => e.id !== id) }));
    else set((state) => ({ events: state.events.filter((e) => e.id !== id) }));
  }
}));

export const useDonationsStore = create((set) => ({
  donations: initialDonations,
  goal: 100000,
  fetchDonations: async () => {
    try {
      const { data, error } = await supabase.from('donations').select('*');
      if (!error && data) set({ donations: data.length > 0 ? data : initialDonations });
    } catch (e) { console.error(e); }
  },
  addDonation: async (item) => {
    const { data, error } = await supabase.from('donations').insert([item]).select();
    if (!error && data) set((state) => ({ donations: [data[0], ...state.donations] }));
    else set((state) => ({ donations: [{ ...item, id: Date.now(), date: new Date().toISOString() }, ...state.donations] }));
  },
  setGoal: (goal) => set({ goal })
}));

export const useSettingsStore = create((set) => ({
  settings: { club_name: 'Meru Prison Stars', logo_url: '' },
  fetchSettings: async () => {
    try {
      const { data, error } = await supabase.from('settings').select('*').limit(1).single();
      if (!error && data) set({ settings: data });
    } catch (e) { console.error(e); }
  },
  updateSettings: async (updatedSettings) => {
    try {
      const { data: existingData, error: fetchError } = await supabase.from('settings').select('*').limit(1).single();
      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
      
      if (existingData) {
        const { data, error } = await supabase.from('settings').update(updatedSettings).eq('id', existingData.id).select().single();
        if (!error && data) set({ settings: data });
      } else {
        const { data, error } = await supabase.from('settings').insert([updatedSettings]).select().single();
        if (!error && data) set({ settings: data });
      }
    } catch (e) { console.error(e); }
  }
}));

export const useStaffStore = create((set) => ({
  staff: [],
  fetchStaff: async () => {
    try {
      const { data, error } = await supabase.from('staff').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('fetchStaff error:', error);
      } else if (data) {
        set({ staff: data });
      }
    } catch (e) { console.error('fetchStaff catch:', e); }
  },
  addStaff: async (member) => {
    const { data, error } = await supabase.from('staff').insert([member]).select();
    if (error) {
      console.error('addStaff error:', error);
      alert('Error saving staff member to database: ' + error.message);
    } else if (data) {
      set((state) => ({ staff: [...state.staff, data[0]] }));
    }
  },
  updateStaff: async (id, updatedMember) => {
    const { data, error } = await supabase.from('staff').update(updatedMember).eq('id', id).select();
    if (error) {
      console.error('updateStaff error:', error);
      alert('Error updating staff member in database: ' + error.message);
    } else if (data) {
      set((state) => ({ staff: state.staff.map((s) => s.id === id ? data[0] : s) }));
    }
  },
  deleteStaff: async (id) => {
    const { error } = await supabase.from('staff').delete().eq('id', id);
    if (error) {
      console.error('deleteStaff error:', error);
      alert('Error deleting staff member from database: ' + error.message);
    } else {
      set((state) => ({ staff: state.staff.filter((s) => s.id !== id) }));
    }
  }
}));
