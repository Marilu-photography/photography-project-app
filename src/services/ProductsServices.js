import createHttp from "./BaseServices";
const http = createHttp(true);


export const getProductList = () => http.get('/');

export const getProductDetails = (id) => http.get(`/products/${id}`);