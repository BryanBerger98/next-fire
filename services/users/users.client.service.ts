import useAxios from '../../utils/axios';
import { CreateUserDTO, User } from './types/user.type';

type UsersServiceFunctions = {
	getUsers: () => Promise<{ users: User[], pageToken?: string }>;
	createUser: (userToCreate: CreateUserDTO) => Promise<User>;
}

const baseURL = '/admin/users';

const useUsersClientService = (): UsersServiceFunctions => {

    const { axios } = useAxios();

    const getUsers = async (): Promise<{ users: User[], pageToken?: string }> => {
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

    return {
        getUsers,
        createUser,
    };

};

export default useUsersClientService;
