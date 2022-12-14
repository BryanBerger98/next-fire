import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuthentication } from '../../../../services/auth/auth.api.service';
import { createUser, getUsers } from '../../../../services/users/users.api.service';

const usersHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        await verifyAuthentication(req, res);

        if (req.method === 'GET') {

            const users = await getUsers();
            return res.status(200).json(users);
        }

        if (req.method === 'POST') {
            const user = await createUser(req.body);
            return res.status(200).json(user);
        }

    } catch (error) {
        return res.status(500).json(error);
    }

};

export default usersHandler;
