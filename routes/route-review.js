/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import verifyToken from '../middleware/verify-token.js'
import {verifyReviewAuthor} from '../middleware/verify-review-author.js'
import * as controllers from '../controllers/review.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/recipe routes--------------------------------*/
router.post('/', controllers.createReview);



/* --------------------------------Exports--------------------------------*/

export default router;