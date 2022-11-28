import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../utils/firebase-admin';

const verifyIdToken = async (idToken: string) => {
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        throw error;
    }
};

const verifyAuthentication = async (req: NextApiRequest, res: NextApiResponse): Promise<DecodedIdToken | null> => {
    try {
        const [ , token ] = req.headers.authorization ? req.headers.authorization.split(' ') : [ null, null ];

        console.log('HEADERS >>>', req.headers.authorization);

        if (!token) {
            res.status(401).json({
                code: 'auth/unauthorized',
                message: 'Unauthorized.',
            });
            return null;
        }

        const decodedToken = await verifyIdToken(token);
        if (!decodedToken) {
            res.status(401).json({
                code: 'auth/unauthorized',
                message: 'Unauthorized.',
            });
            return null;
        }

        return decodedToken;
    } catch (error) {
        throw error;
    }
};

export { verifyIdToken, verifyAuthentication };
