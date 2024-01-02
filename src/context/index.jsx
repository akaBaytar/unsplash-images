import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const dark = !isDarkTheme;
    setIsDarkTheme(dark);

    document.body.classList.toggle('dark-theme', dark);
  };

  return (
    <AppContext.Provider value={{ isDarkTheme, searchTerm, setSearchTerm, toggleDarkTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
