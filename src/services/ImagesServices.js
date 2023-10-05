import createHttp from "./BaseServices";
const http = createHttp(true);

export const getImagesList = () => http.get('/images');  