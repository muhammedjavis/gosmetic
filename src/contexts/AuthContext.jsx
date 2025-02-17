import { createContext, useContext, useEffect, useState } from 'react';
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

  const signIn = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        skinProfiles,
        signUp,
        signIn,
        signOut,
        saveSkinProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
