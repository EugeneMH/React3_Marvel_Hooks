import {useState, useCallback} from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {  
                throw new Error(`Could not fetch${url}, status ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch(e) {
            setError(e.message);
            setLoading(false);
            throw e;
        }
    }, [])

    const clearError = () => {
        setError(false);
    }

    return {loading, error, request, clearError}
}

export default useHttp;