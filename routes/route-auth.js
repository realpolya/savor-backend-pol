/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import * as controllers from '../controllers/auth.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/auth routes--------------------------------*/

router.post('/sign-in', controllers.signIn);
router.post('/sign-up', controllers.signUp);

/* --------------------------------Exports--------------------------------*/

export default router;