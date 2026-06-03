import axios from 'axios';

const api = axios.create({
    baseURL: 'https://url-shortner-2-jkmr.onrender.com/api',
});

export default api;