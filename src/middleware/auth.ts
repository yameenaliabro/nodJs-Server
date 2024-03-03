import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';


declare global {
    namespace Express {
        interface Request {
            user?: { userId: string };
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Authorization token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY as Secret) as { userId: string };
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;