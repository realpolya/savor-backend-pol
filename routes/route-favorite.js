/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import verifyToken from '../middleware/verify-token.js'
import * as favoritesController from '../controllers/favorite.js';
import {getFavorites, removeRecipeFromFavorites} from "../controllers/favorite.js";
/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/favorite routes--------------------------------*/
// Signed in routes
router.use(verifyToken); // checking that user is authenticated for all the actions below
// Get all favorites
router.get('/', favoritesController.getFavorites)
// Add to favorites
router.post('/:recipeId', favoritesController.addToFavorites)
//update favorites
router.put("/:recipeId", favoritesController.removeRecipeFromFavorites)





/* --------------------------------Exports--------------------------------*/

export default router;