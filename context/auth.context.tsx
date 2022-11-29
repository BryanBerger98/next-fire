import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CurrentUser } from '../services/auth/types/current-user.type';
import { auth } from '../utils/firebase';

type AuthContextValue = {
	currentUser: CurrentUser | null;
	loading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export { AuthContext };

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuthContext is null');
    }
    if (context === undefined) {
        throw new Error('useAuthContext was used outside of its Provider');
    }
    return context;
};

export { useAuthContext };

type AuthContextProviderProperties = {
	children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProperties) => {

    const [ currentUser, setCurrentUser ] = useState<CurrentUser | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = useMemo(() => ({
        currentUser,
        loading,
    }), [
        currentUser,
        loading,
    ]);

    return (
        <AuthContext.Provider value={ value }>
            { loading ? null : children }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
