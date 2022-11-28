import { auth } from '../../utils/firebase-admin';

const getUsers = async () => {
    try {
        const result = await auth.listUsers();
        return result;
    } catch (error) {
        throw error;
    }
};

export { getUsers };
