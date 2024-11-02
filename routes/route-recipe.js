/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import verifyToken from '../middleware/verify-token.js'
import { verifyRecipeAuthor } from '../middleware/verify-recipe-author.js'
import { verifyReviewAuthor } from "../middleware/verify-review-author.js";
import * as recipesController from '../controllers/recipe.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/recipe routes--------------------------------*/
router.get('/',recipesController.getAllRecipes);
router.get('/recipe/:recipeId', recipesController.getSingleRecipe);

router.use(verifyToken);

router.get('/my-recipes', recipesController.getUserRecipes);
router.post('/', recipesController.createRecipe);
router.put('/:recipeId',  verifyRecipeAuthor, recipesController.updateRecipe);
router.delete('/recipe/:recipeId',  verifyRecipeAuthor, recipesController.deleteRecipe)

/* --------------------------------reviews--------------------------------*/

router.post('/:recipeId/reviews',  recipesController.createReview)
router.put('/:recipeId/reviews/:reviewId', verifyReviewAuthor, recipesController.updateReview)
router.delete('/:recipeId/reviews/:reviewId',verifyReviewAuthor, recipesController.deleteReview)

/* --------------------------------Exports--------------------------------*/

export default router;