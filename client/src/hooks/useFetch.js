// import axios from 'axios';
import { useState, useEffect } from 'react';
import api from '../axios';

const useFetch = (url, payload, headers) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get(url, payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        ...headers
                    }
                });
                setResponse(data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url, payload, headers]);

    return { response, error, isLoading };
};

export default useFetch;
