import axios from 'axios';
const api = axios.create({
  baseURL: 'https://authbackend-5s9n.onrender.com',
  withCredentials: true,
});
export default api;