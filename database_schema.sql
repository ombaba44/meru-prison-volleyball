-- Run this in Supabase SQL Editor

-- Players Table
CREATE TABLE public.players (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  position text NOT NULL,
  jersey_number text NOT NULL,
  bio text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Gallery Table
CREATE TABLE public.gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text,
  image_url text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Outreach Table
CREATE TABLE public.outreach (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Events Table
CREATE TABLE public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Donations Table
CREATE TABLE public.donations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  amount numeric NOT NULL,
  phone_number text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS (Row Level Security)
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access on outreach" ON public.outreach FOR SELECT USING (true);
CREATE POLICY "Allow public read access on events" ON public.events FOR SELECT USING (true);

-- Allow authenticated users to perform all operations
CREATE POLICY "Allow auth all on players" ON public.players FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on outreach" ON public.outreach FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on events" ON public.events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on donations" ON public.donations FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
CREATE POLICY "Allow public read access on images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Allow auth all on images" ON storage.objects FOR ALL USING (auth.role() = 'authenticated');

-- Settings Table
CREATE TABLE public.settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  club_name text DEFAULT 'Meru Prison Stars',
  logo_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INITIAL SETTINGS ROW
INSERT INTO public.settings (club_name, logo_url) VALUES ('Meru Prison Stars', null);

-- Setup RLS (Row Level Security) for Settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and admin full access
CREATE POLICY "Allow public read access on settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow auth all on settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- Gallery Events Table
CREATE TABLE public.gallery_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  cover_image text,
  event_date date,
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS (Row Level Security) for Gallery Events
ALTER TABLE public.gallery_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on gallery_events" ON public.gallery_events FOR SELECT USING (true);
CREATE POLICY "Allow auth all on gallery_events" ON public.gallery_events FOR ALL USING (auth.role() = 'authenticated');

-- Update Gallery Table for relationships
-- Run this carefully to avoid dropping existing gallery items
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS event_id uuid REFERENCES public.gallery_events(id) ON DELETE CASCADE;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS caption text;

-- NEW STAFF TABLE
CREATE TABLE public.staff (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  department text,
  image_url text,
  bio text,
  experience text,
  category text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Allow auth all on staff" ON public.staff FOR ALL USING (auth.role() = 'authenticated');
