import createHttp from "./BaseServices";
const http = createHttp(true);

export const createComment = (id, body) => http.post(`/comments/create/${id}`, body);

export const listComments = (id) => http.get(`/comments/list/${id}`);

export const deleteComment = (commentId) => http.delete(`/comments/delete/${commentId}`);