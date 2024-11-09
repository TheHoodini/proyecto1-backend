import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const authorizeRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.user && typeof req.user !== 'string' && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado: No tienes los permisos necesarios' });
        }
    };
};
