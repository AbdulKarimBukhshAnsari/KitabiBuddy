<<<<<<< HEAD
import { createClient } from "@supabase/supabase-js";
=======

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import { createClient } from '@supabase/supabase-js';
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2

// Load environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

<<<<<<< HEAD
// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);
=======
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing.');
}

// Create Supabase client with AsyncStorage for React Native session persistence
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Manage auto-refresh based on app foreground/background state
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
export default supabase;
