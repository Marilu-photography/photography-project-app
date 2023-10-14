import createHttp from "./BaseServices";
const http = createHttp(true);

export const getCurrentUser = () => http.get('/users/me');
export const getUserProfile = (id) => http.get(`/profile/${id}`);

export const editUser = (id, user) =>  http.post(`/profile/${id}`, user);

