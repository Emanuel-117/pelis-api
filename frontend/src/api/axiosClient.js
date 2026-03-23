import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor ────────────────────────────────────────────────
axiosClient.interceptors.request.use(
    (config) => {
        // Punto de extensión: agregar JWT token aquí cuando se implemente auth
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response Interceptor ───────────────────────────────────────────────
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const msg =
            error?.response?.data?.message ||
            error?.response?.data?.errors?.[0] ||
            error?.message ||
            'Error desconocido';
        return Promise.reject(new Error(msg));
    }
);

export default axiosClient;
