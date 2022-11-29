import admin, { FirebaseError } from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    });
} catch (error) {
    const { message, stack } = error as FirebaseError;
    if (!/already exists/u.test(message)) {
        console.error('Firebase admin initialization error', stack);
    }
}

export default admin;

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
