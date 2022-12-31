import axios from 'axios';

const BASE_URL = "http://localhost:5500/api"



const api = axios.create({

    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        "content-type": "application/json"
    }
});


export default api