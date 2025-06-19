import axios from 'axios';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const apiUrl = import.meta.env.VITE_API_URL;

const managementApi = axios.create({
    baseURL: apiUrl,
});

managementApi.interceptors.request.use((config) => {
    const token = cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { managementApi };