import createHttp from "./BaseServices";
const http = createHttp(true);

export const listOrders = () => http.get('/orders');

export const updateOrderStatus = (id, status) => http.post(`/orders/update-status/${id}`, { status });