import { Router } from 'express';
import {registerUser} from '../controller/user-controller'

const router = Router();

router.post('/registration', registerUser);

export default router;