import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../lib/env';

export const signToken = (payload: any) => {
    return jwt.sign(payload, AUTH_SECRET!, { expiresIn: '7d' })
};

export const verifyToken = <T>(token: string) => {
    return jwt.verify(token, AUTH_SECRET!)
};
