/* --------------------------------Imports--------------------------------*/

import Recipe from '../models/model-recipe.js';

/* --------------------------------Middleware Function--------------------------------*/

// compare logged in user to the recipe owner (PUT and DELETE routes)
const verifyRecipeAuthor = async (req, res, next) => {

    try {

        const recipe = await Recipe.findById(req.params.recipeId);

        if (JSON.stringify(req.user._id) !== JSON.stringify(recipe.author)) {
            return res.status(401).json({ error: "Unauthorized!"});
        }

        next();

    } catch (err) {

        res.status(401).json({ err: "We have an issue" });

    }

}

/* --------------------------------Exports--------------------------------*/

export { verifyRecipeAuthor }