import http from "./BaseServices";


export const getProductList = () => http.get('/');

export const getProductDetails = (id) => http.get(`/${id}`);