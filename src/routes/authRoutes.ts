import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register', register);  // Ruta para registro
router.post('/login', login);        // Ruta para inicio de sesión

export default router;
