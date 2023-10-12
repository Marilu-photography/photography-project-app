import createHttp from "./BaseServices";
const http = createHttp();

export const register = (user) => http.post('/register', user);

export const login = (user) => http.post('/login', user);

export const sendActivationEmail = (user) => http.post('/send-activation-email', user);

