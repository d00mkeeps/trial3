// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const key = import.meta.env.VITE_SUPABASE_KEY;
const url = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(url, key);

export const fetchUserProfile = async () => {
  try {
    const { data: userProfiles, error } = await supabase
      .from("user_profiles")
      .select();

    if (error) {
      throw error;
    }

    return userProfiles[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Define other Supabase-related functions here
