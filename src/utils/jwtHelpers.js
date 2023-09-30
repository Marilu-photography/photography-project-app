import decode from 'jwt-decode';

export const verifyJWT = (token) => {
  
    const decoded = decode(token);
   return Date.now() <= decoded.exp * 1000;
  
}