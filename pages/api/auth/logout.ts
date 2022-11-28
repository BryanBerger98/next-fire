import { NextApiRequest, NextApiResponse } from 'next';
import { unsetAuthCookies } from 'next-firebase-auth';
import initAuth from '../../../utils/initAuth';

initAuth();

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await unsetAuthCookies(req, res);
    } catch (error) {
        return res.status(500).json(error);
    }
    return res.status(200).json({ success: true });
};

export default logoutHandler;
