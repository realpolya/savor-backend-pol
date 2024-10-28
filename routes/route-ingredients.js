/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import * as ingredientsController from '../controllers/ingredients.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/recipe routes--------------------------------*/

router.get('/', ingredientsController.getAllIngredients);

/* --------------------------------Exports--------------------------------*/

export default router;