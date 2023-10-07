import createHttp from "./BaseServices";
const http = createHttp(true);

export const getImagesList = () => http.get('/images');  

export const getImage = (id) => http.get(`/editor/${id}`);

export const createImage = (data) => http.post('/images/upload', data);