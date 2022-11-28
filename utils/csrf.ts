import csurf from 'csurf';
import { Request, Response } from 'express-serve-static-core';
import { NextApiRequest, NextApiResponse } from 'next';

export type CsrfRequest = NextApiRequest & Request;
export type CsrfResponse = NextApiResponse & Response;

const csrf = (req: CsrfRequest, res: CsrfResponse) => {
    return new Promise((resolve, reject) => {
        csurf({
            cookie: {
                httpOnly: true,
                sameSite: 'strict',
            },
        })(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

export default csrf;
