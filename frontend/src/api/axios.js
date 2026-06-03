import axios from "axios";

const api = axios.create({
    baseURL: "https://url-shortner-2-jkmr.onrender.com/api",
});

// 🔥 ADD THIS (DO NOT REMOVE EXISTING CODE)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;