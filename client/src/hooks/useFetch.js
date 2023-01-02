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






//

const cache = new Map();
export const useCustomQuery = (queryKey) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            if (cache.has(queryKey)) {
                console.log('has')
                setResponse(cache.get(queryKey));
            } else {
                setIsLoading(true);
                try {
                    // const response = axios.get(`https://my-api.com/endpoint/${queryKey}`);
                    const response = await api.get(queryKey);
                    cache.set(queryKey, response.data);
                    setResponse(response.data);
                    console.log(response.data)
                } catch (error) {
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchData()

    }, [queryKey]);

    return { response, isLoading, error };
}
