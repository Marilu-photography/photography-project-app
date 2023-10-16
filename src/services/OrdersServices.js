import createHttp from "./BaseServices";
const http = createHttp(true);

export const listOrders = () => http.get('/orders');