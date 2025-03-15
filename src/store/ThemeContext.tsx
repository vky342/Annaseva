
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';
type LanguageType = 'english' | 'hindi' | 'spanish' | 'french';
type DistanceUnitType = 'km' | 'mi';
type PrivacyLevelType = 'public' | 'balanced' | 'private';

interface ThemeContextType {
  theme: ThemeType;
  language: LanguageType;
  distanceUnit: DistanceUnitType;
  privacyLevel: PrivacyLevelType;
  notifications: {
    newDonations: boolean;
    expiringSoon: boolean;
    dailyDigest: boolean;
  };
  security: {
    twoFactorAuth: boolean;
  };
  setTheme: (theme: ThemeType) => void;
  setLanguage: (language: LanguageType) => void;
  setDistanceUnit: (unit: DistanceUnitType) => void;
  setPrivacyLevel: (level: PrivacyLevelType) => void;
  toggleNotification: (key: keyof ThemeContextType['notifications']) => void;
  toggleSecurity: (key: keyof ThemeContextType['security']) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'light';
  });
  
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as LanguageType) || 'english';
  });
  
  const [distanceUnit, setDistanceUnitState] = useState<DistanceUnitType>(() => {
    const savedUnit = localStorage.getItem('distanceUnit');
    return (savedUnit as DistanceUnitType) || 'km';
  });
  
  const [privacyLevel, setPrivacyLevelState] = useState<PrivacyLevelType>(() => {
    const savedLevel = localStorage.getItem('privacyLevel');
    return (savedLevel as PrivacyLevelType) || 'balanced';
  });
  
  const [notifications, setNotifications] = useState({
    newDonations: true,
    expiringSoon: true,
    dailyDigest: false,
  });
  
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
  });

  // Apply theme to document when it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Store other settings in localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('distanceUnit', distanceUnit);
  }, [distanceUnit]);
  
  useEffect(() => {
    localStorage.setItem('privacyLevel', privacyLevel);
  }, [privacyLevel]);

  // Wrapper functions to set state and localStorage
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };
  
  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
  };
  
  const setDistanceUnit = (newUnit: DistanceUnitType) => {
    setDistanceUnitState(newUnit);
  };
  
  const setPrivacyLevel = (newLevel: PrivacyLevelType) => {
    setPrivacyLevelState(newLevel);
  };
  
  const toggleNotification = (key: keyof ThemeContextType['notifications']) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const toggleSecurity = (key: keyof ThemeContextType['security']) => {
    setSecurity(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      language, 
      distanceUnit, 
      privacyLevel,
      notifications,
      security,
      setTheme, 
      setLanguage, 
      setDistanceUnit, 
      setPrivacyLevel,
      toggleNotification,
      toggleSecurity
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
