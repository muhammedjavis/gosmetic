import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skinProfiles, setSkinProfiles] = useState([]);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user's skin profiles
  useEffect(() => {
    if (user) {
      fetchSkinProfiles();
    }
  }, [user]);

  const fetchSkinProfiles = async () => {
    const { data, error } = await supabase
      .from('skin_profiles')
      .select('*')
      .eq('user_id', user.id);

    if (!error) {
      setSkinProfiles(data);
    }
  };

  const signUp = (email, password) => {
    return supabase.auth.signUp({ email, password });
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = () => {
    return supabase.auth.signOut();
  };

  const saveSkinProfile = async (profileData) => {
    const { data, error } = await supabase
      .from('skin_profiles')
      .insert([
        {
          user_id: user.id,
          ...profileData,
        },
      ])
      .select();

    if (!error) {
      setSkinProfiles([...skinProfiles, data[0]]);
    }
    return { data, error };
  };

  const saveReview = async (productId, rating, comment) => {
    const { data, error } = await supabase.from('reviews').insert([
      {
        user_id: user.id,
        product_id: productId,
        rating,
        comment,
        created_at: new Date(),
      },
    ]);
    return { data, error };
  };

  const saveRoutine = async (routineSteps) => {
    const { data, error } = await supabase.from('routines').insert([
      {
        user_id: user.id,
        steps: routineSteps,
        created_at: new Date(),
      },
    ]);
    return { data, error };
  };

  const saveProgress = async (date, completedSteps) => {
    const { data, error } = await supabase.from('progress').insert([
      {
        user_id: user.id,
        date,
        completed_steps: completedSteps,
      },
    ]);
    return { data, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        skinProfiles,
        setUser,
        signUp,
        signIn,
        signOut,
        saveSkinProfile,
        saveReview,
        saveRoutine,
        saveProgress,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
