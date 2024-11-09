import { Request, Response } from 'express';
import User from '../models/user';

export const softDeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        
        const user = await User.findByIdAndUpdate(userId, { active: false }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.json({ message: 'Usuario desactivado exitosamente' });
    } catch (error) {
        console.error("Error al desactivar usuario:", error);
        res.status(500).json({ message: 'Error al desactivar usuario' });
    }
};
