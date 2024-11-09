import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomJwtPayload extends jwt.JwtPayload {
    id: string;
}

export interface AuthRequest extends Request {
    user?: CustomJwtPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' });
        return;  
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as CustomJwtPayload;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
