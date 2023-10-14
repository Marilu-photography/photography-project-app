import createHttp from "./BaseServices";
const http = createHttp(true);

export const getProductList = () => http.get('/');  

export const createProduct = (product) => http.post('/create', product);

export const getProductDetails = (id) => http.get(`/products/${id}`);

export const buyProduct = (product) => http.post('/products/checkout', product);

export const editProduct = (id, product) => http.patch(`/products/${id}`, product);

export const deleteProduct = (id) => http.delete(`/products/${id}`);

export const getSearch = (query) => http.get(`/search?query=${query}`);
