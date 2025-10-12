import axios from "axios";

const API = axios.create({
    baseURL:'http://localhost:8080'
});

API.interceptors.request.use((req) => { 
    const token = localStorage.getItem("token")
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export const register = (name, email, password) => API.post('/auth/register', {name, email, password})
export const loginUser = (email, password) => API.post('/auth/login', {email, password})
export const getEvents = (limit, offset) => API.get(`/events?limit=${limit}&offset=${offset}`)
export const getEvent = (id) => API.get(`events/${id}`)
export const UserEvents = () => API.get(`events/user`)
export const bookings = () => API.get(`/bookings`)
export const createEvent = (title, description, date, total_seats) => API.post(`/events`,{title, description, date, total_seats})
