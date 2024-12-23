import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/home`, {
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
