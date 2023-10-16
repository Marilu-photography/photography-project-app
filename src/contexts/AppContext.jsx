
import { createContext, useContext, useState } from 'react';


const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const setGlobalSearchResults = (results) => {
    setSearchResults(results);
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <AppContext.Provider value={{ searchResults, setGlobalSearchResults, clearSearchResults }}>
      {children}
    </AppContext.Provider>
  );
};