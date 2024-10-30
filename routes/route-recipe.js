/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import verifyToken from '../middleware/verify-token.js'
import {verifyRecipeAuthor} from '../middleware/verify-recipe-author.js'
import {verifyReviewAuthor} from "../middleware/verify-review-author.js";
import * as recipesController from '../controllers/recipe.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/recipe routes--------------------------------*/
router.get('/',recipesController.getAllRecipes);
router.get('/recipe/:recipeId', recipesController.getSingleRecipe);


// Signed in routes
router.use(verifyToken); // checking that user is authenticated for all the actions below
router.get('/my-recipes', recipesController.getUserRecipes);

// Create Recipe
router.post('/', recipesController.createRecipe);

//update Recipe
router.put('/:recipeId',  verifyRecipeAuthor, recipesController.updateRecipe);

//Delete Recipe
router.delete('/recipe/:recipeId',  verifyRecipeAuthor, recipesController.deleteRecipe);

/* --------------------------------reviews--------------------------------*/

router.post('/:recipeId/reviews',  recipesController.createReview)
router.put('/:recipeId/reviews/:reviewId', verifyReviewAuthor, recipesController.updateReview)
router.delete('/:recipeId/reviews/:reviewId',verifyRecipeAuthor,recipesController.deleteReview)

/* --------------------------------Exports--------------------------------*/

export default router;