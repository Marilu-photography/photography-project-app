import http from "./BaseServices";

export const getHome = () => http.get("/");