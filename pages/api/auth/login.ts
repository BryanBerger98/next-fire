import { NextApiRequest, NextApiResponse } from 'next';
import { setAuthCookies } from 'next-firebase-auth';
import csrf, { CsrfRequest, CsrfResponse } from '../../../utils/csrf';
import initAuth from '../../../utils/initAuth';

initAuth();

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await csrf(req as CsrfRequest, res as CsrfResponse);
        await setAuthCookies(req, res);
    } catch (error) {
        return res.status(500).json(error);
    }
    return res.status(200).json({ success: true });
};

export default loginHandler;
