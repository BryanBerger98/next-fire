import useAxios from '../../utils/axios';

const baseUrl = '/auth';

const useAuthApi = () => {

    const { axios } = useAxios();

    const getCurrentLoggedInUser = async () => {
        try {
            const response = await axios.get(`${ baseUrl }/account`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${ baseUrl }/login`, {
                email,
                password,
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const signupUser = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${ baseUrl }/signup`, {
                email,
                password,
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const resetPassword = async (token: string, password: string) => {
        try {
            const response = await axios.put(`${ baseUrl }/reset-password`, {
                token,
                password,
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };


    const sendResetPasswordEmailToUserByEmail = async (email: string) => {
        try {
            const response = await axios.post(`${ baseUrl }/reset-password`, { email }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const sendVerifyAccountEmailToUser = async () => {
        try {
            const response = await axios.get(`${ baseUrl }/verify-email`, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const verifyEmail = async (token: string) => {
        try {
            const response = await axios.put(`${ baseUrl }/verify-email`, { token }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updatePassword = async (oldPassword: string, newPassword: string) => {
        try {
            const response = await axios.put(`${ baseUrl }/update-password`, {
                newPassword,
                oldPassword,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateEmail = async (email: string, password: string) => {
        try {
            const response = await axios.put(`${ baseUrl }/update-email`, {
                email,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateAccount = async ({ phone_number, username }: { phone_number: string, username: string }) => {
        try {
            const response = await axios.put(`${ baseUrl }/account`, {
                phone_number,
                username,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateAvatar = async (file: Blob) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const response = await axios.put(`${ baseUrl }/account/avatar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        getCurrentLoggedInUser,
        loginUser,
        signupUser,
        resetPassword,
        sendResetPasswordEmailToUserByEmail,
        sendVerifyAccountEmailToUser,
        verifyEmail,
        updatePassword,
        updateEmail,
        updateAccount,
        updateAvatar,
    };

};

export default useAuthApi;
