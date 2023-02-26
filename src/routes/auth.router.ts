import { Router } from 'express';
import { registerUser, login, details } from '../controllers/auth.controller';
import authentication from '../middleware/auth';

const router = Router();

router.route('/auth/signup').post(registerUser);
router.route('/auth/login').post(login);
router.route('/profile').get(authentication, details);

export default router;
