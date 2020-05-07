import { Router } from 'express';
import {signIn} from '../controller/auth-controller'

const router = Router();

router.post('/login', signIn);

export default router;