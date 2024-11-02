/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import verifyToken from '../middleware/verify-token.js'
import * as favoritesController from '../controllers/favorite.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/favorite routes--------------------------------*/

router.use(verifyToken); 
router.get('/', favoritesController.getFavorites)
router.post('/:recipeId', favoritesController.addToFavorites)
router.put("/:recipeId", favoritesController.removeFromFavorites)

/* --------------------------------Exports--------------------------------*/

export default router;