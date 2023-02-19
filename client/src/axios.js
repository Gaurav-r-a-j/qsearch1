import axios from 'axios';

// const BASE_URL = "http://localhost:5500/api"
const BASE_URL = "https://qsearch.onrender.com/api"



const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        "content-type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error
            console.log('Unauthorized error');
        }
        return Promise.reject(error);
    }
);

export default api