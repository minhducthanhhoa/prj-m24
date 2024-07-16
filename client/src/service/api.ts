import axios from 'axios';

const API_URL = 'http://localhost:5000/products';
const AUTH_URL = 'http://localhost:5000/users';

export const fetchProducts = () => axios.get(`${API_URL}/products`);

export const loginUser = (email: string, password: string) => axios.post(`${AUTH_URL}/loginUser`, { email, password });

export const registerUser = (name: string, email: string, password: string) => axios.post(`${AUTH_URL}/register`, { name, email, password });
