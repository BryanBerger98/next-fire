import { init } from 'next-firebase-auth';

const initAuth = () => {
    init({
        debug: true,
        authPageURL: '/admin/auth/login',
        appPageURL: '/',
        loginAPIEndpoint: '/api/auth/login',
        logoutAPIEndpoint: '/api/auth/logout',
        onLoginRequestError: (err) => {
            console.error(err);
        },
        onLogoutRequestError: (err) => {
            console.error(err);
        },
        firebaseClientInitConfig: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY as string,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        },
        cookies: {
            name: 'cflf_auth',
            keys: [
                process.env.COOKIE_SECRET_CURRENT,
                process.env.COOKIE_SECRET_PREVIOUS,
            ],
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 24 * 1000,
            overwrite: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE,
            signed: true,
        },
        onVerifyTokenError: (err) => {
            console.error(err);
        },
        onTokenRefreshError: (err) => {
            console.error(err);
        },
    });


};

export default initAuth;
