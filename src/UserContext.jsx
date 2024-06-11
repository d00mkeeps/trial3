// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from "./supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await fetchUserProfile();
        setUserProfile(userProfileData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isImperial = userProfile?.isImperial || false;

  return (
    <UserContext.Provider value={{ userProfile, isImperial, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
