import { default as Axios } from 'axios';
import { getIdToken } from 'firebase/auth';
import { useCallback, useMemo } from 'react';
import { useAuthContext } from '../context/auth.context';
import { useCsrfContext } from '../context/csrf.context';

const useAxios = () => {

    const { csrfToken } = useCsrfContext();
    const { currentUser } = useAuthContext();

    // const axios = useMemo(() => (
    //     Axios.create({
    //         baseURL: '/api',
    //         timeout: 10000,
    //         headers: { 'CSRF-Token': csrfToken },
    //     })
    // ), [ csrfToken ]);

    const axios = useCallback(async () => {
        const axios = Axios.create({
            baseURL: '/api',
            timeout: 10000,
            headers: { 'CSRF-Token': csrfToken },
        });
        if (currentUser) {
            const idToken = await getIdToken(currentUser);
            axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${ idToken }`;
        } else if (axios.defaults.headers.common[ 'Authorization' ]) {
            axios.defaults.headers.common[ ' Authorization ' ] = null;
        }
        return axios;
    }, [ csrfToken, currentUser ]);


    return useMemo(() => ({ axios }), [ axios ]);

};

export default useAxios;
