/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import verifyToken from '../middleware/verify-token.js'
import {verifyRecipeAuthor} from '../middleware/verify-recipe-author.js'
import * as recipesController from '../controllers/recipe.js';
import {verifyReviewAuthor} from "../middleware/verify-review-author.js";

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/recipe routes--------------------------------*/
router.get('/',recipesController.getAllRecipes);
router.get('/:recipeId', recipesController.getSingleRecipe);


// Signed in routes
router.use(verifyToken); // checking that user is authenticated for all the actions below
// Create Recipe
router.post('/', recipesController.createRecipe);
//update Recipe
router.put('/:recipeId',  verifyRecipeAuthor, recipesController.updateRecipe);
//Delete Recipe
router.delete('/:recipeId',  verifyRecipeAuthor, recipesController.deleteRecipe);
// router.post('/', verifyReviewAuthor, controllers.createReview)


/* --------------------------------Exports--------------------------------*/

export default router;