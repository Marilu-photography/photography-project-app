
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

  return (
    <AppContext.Provider value={{ searchResults, setGlobalSearchResults }}>
      {children}
    </AppContext.Provider>
  );
};