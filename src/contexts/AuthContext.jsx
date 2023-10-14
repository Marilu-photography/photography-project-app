import {createContext, useState, useEffect, useContext} from 'react';
import { setAccessToken, getAccessToken, logout } from '../stores/AccessTokenStore';   
import { getCurrentUser } from '../services/UserServices';
import { verifyJWT } from '../utils/jwtHelpers';
import { useCart } from 'react-use-cart';


const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticationFetched, setIsAuthenticationFetched] = useState(false);
  const { emptyCart } = useCart();

  const login = (token, navigateCb) => {
    setAccessToken(token);
    getUser(navigateCb)
  };

  const getUser = (cb) => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
        setIsAuthenticationFetched(true);
        
        cb && cb();
        
      })
      .catch(err => {
        console.error(err);
        setIsAuthenticationFetched(true);
  });
}

  useEffect(() => {
    

    if (getAccessToken()) {
      if (!verifyJWT(getAccessToken())) {
        emptyCart();
        logout()
          
      } else {
        getUser();
       
      }
    } else {
        setIsAuthenticationFetched(true);
    
    }
  }, []);



  const value = {
    user,
    isAuthenticationFetched,
    login,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;