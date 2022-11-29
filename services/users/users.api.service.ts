import { auth, db } from '../../utils/firebase-admin';
import { generatePassword } from '../../utils/passwords';
import { CreateUserDTO, User } from './types/user.type';

const getUsers = async () => {
    try {
        const result = await db.collection('users').get();
        const total = await (await db.collection('users').count().get()).data().count;
        const users = result.docs.map(doc => doc.data());

        return {
            users,
            total,
            count: users.length,
        };
    } catch (error) {
        throw error;
    }
};

const createUser = async (userToCreate: CreateUserDTO): Promise<User> => {
    try {

        const password = generatePassword(12);

        const createdUser = await auth.createUser({
            ...userToCreate,
            phoneNumber: userToCreate.phoneNumber ? userToCreate.phoneNumber : undefined,
            password,
        });

        const newUser = {
            ...userToCreate,
            uid: createdUser.uid,
            createdAt: new Date(),
            updatedAt: null,
        };

        await db.collection('users').doc(createdUser.uid).set(newUser);

        return newUser;

    } catch (error) {
        throw error;
    }
};

export { getUsers, createUser };
