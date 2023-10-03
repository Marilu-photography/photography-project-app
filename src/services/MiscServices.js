import createHttp from "./BaseServices";
const http = createHttp();

export const createComment = (productId, commentData) => http.post(`/comments/${productId}`, commentData).then((response) => response.data);;

export const deleteComment = (id) => http.delete(`/comments/${id}`);

export const getCommentsForProduct = (productId) => http.get(`/comments/${productId}`).then((response) => response.data);;