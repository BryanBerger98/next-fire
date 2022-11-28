import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User as FirebaseUser, UserCredential } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export type User = FirebaseUser;

type AuthServiceFunctions = {
	loginUser: (email: string, password: string) => Promise<UserCredential>;
	signupUser: (email: string, password: string) => Promise<UserCredential>;
	signoutUser: () => Promise<void>;
}

const useAuthClientService = (): AuthServiceFunctions => {

    const loginUser = async (email: string, password: string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            return userCredentials;
        } catch (error) {
            throw error;
        }
    };

    const signupUser = async (email: string, password: string) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            return userCredentials;
        } catch (error) {
            throw error;
        }
    };

    const signoutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    return {
        loginUser,
        signupUser,
        signoutUser,
    };

};

export default useAuthClientService;
