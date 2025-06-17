import axios from 'axios';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

const managementApi = axios.create({
    baseURL: "http://localhost:5000/api",
});

managementApi.interceptors.request.use((config) => {
    const token = cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { managementApi };