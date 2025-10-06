import axios from "axios";

const API = axios.create({
    baseURL:'http://localhost:8080'
});

export const register = (name, email, password) => API.post('/auth/register', {name, email, password})

