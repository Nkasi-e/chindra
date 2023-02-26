import { Router } from 'express';
import { registerProfile } from '../controllers/profile.controller';
import authentication from '../middleware/auth';

const router = Router();

router.route('/createprofile').post(authentication, registerProfile);

export default router;
