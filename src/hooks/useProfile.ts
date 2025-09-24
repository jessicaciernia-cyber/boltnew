import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        return;
      }

      // Refresh profile data
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetchProfile: fetchProfile,
  };
};