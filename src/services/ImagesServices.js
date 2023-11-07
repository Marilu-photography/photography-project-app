import createHttp from "./BaseServices";
const http = createHttp(true);

export const getImagesList = () => http.get('/images');  

export const getImage = (id) => http.get(`/editor/${id}`);

export const createImage = (image) => http.post('/images/upload', image);

export const deleteImage = (id) => http.delete(`/images/${id}`);

export const editImage = (id, image) => http.post(`/images/${id}/edited-image`, image);

export const likeCreate = (userId, imageId) => http.post(`/likes/${userId}/${imageId}`)

export const likeDelete = (userId, imageId) => http.delete(`/likes/${userId}/${imageId}`)

export const listLikes = () => http.get(`/likes/list`);