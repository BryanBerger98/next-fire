import useAxios from '../../utils/axios';
import { CreateUserDTO, User } from './types/user.type';

type UsersServiceFunctions = {
	getUsers: () => Promise<{ users: User[], count: number, total: number }>;
	createUser: (userToCreate: CreateUserDTO) => Promise<User>;
	deleteUserById: (uid: string) => Promise<User>;
	switchDisabledUser: (uid: string) => Promise<User>;
	sendResetPasswordEmailToUser: (uid: string) => Promise<void>;
	updateUserAvatar: (uid: string, file: File) => Promise<{ path: string }>;
};

const baseURL = '/admin/users';

const useUsersClientService = (): UsersServiceFunctions => {

    const { axios } = useAxios();

    const getUsers = async (): Promise<{ users: User[], count: number, total: number }> => {
        const { get } = await axios();
        try {
            const response = await get(`${ baseURL }`, { withCredentials: true });

            const { data } = response;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const createUser = async (userToCreate: CreateUserDTO): Promise<User> => {
        const { post } = await axios();
        try {
            const response = await post(`${ baseURL }`, userToCreate, { headers: { 'Content-Type': 'application/json' } });
            const { data } = response;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const deleteUserById = async (uid: string): Promise<User> => {
        const { delete: del } = await axios();
        try {
            const response = await del(`${ baseURL }/${ uid }`);
            const { data } = response;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const switchDisabledUser = async (uid: string): Promise<User> => {
        const { get } = await axios();
        try {
            const response = await get(`${ baseURL }/${ uid }`);
            const { data } = response;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const sendResetPasswordEmailToUser = async (uid: string): Promise<void> => {
        const { get } = await axios();
        try {
           	await get(`${ baseURL }/${ uid }/verify-email`);
            return;
        } catch (error) {
            throw error;
        }
    };

    const updateUserAvatar = async (uid: string, file: File): Promise<{ path: string }> => {
        const { put } = await axios();
        try {
           	await put(`${ baseURL }/${ uid }/update-avatar`);
            return { path: '' };
        } catch (error) {
            throw error;
        }
    };

    return {
        getUsers,
        createUser,
        deleteUserById,
        switchDisabledUser,
        sendResetPasswordEmailToUser,
        updateUserAvatar,
    };

};

export default useUsersClientService;
