import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  birth_date?: string;
  birth_time?: string;
  birth_location?: string;
  birth_latitude?: number;
  birth_longitude?: number;
  birth_timezone?: number;
  sun_sign?: string;
  moon_sign?: string;
  rising_sign?: string;
  created_at: string;
  updated_at: string;
};