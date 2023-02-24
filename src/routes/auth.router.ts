import { Router } from 'express';
import { registerUser, login } from '../controllers/auth.controller';

const router = Router();

router.route('/signup').post(registerUser);
router.route('/login').post(login);

export default router;
