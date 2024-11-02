/* --------------------------------Imports--------------------------------*/

import Recipe from '../models/model-recipe.js';

/* --------------------------------Middleware Function--------------------------------*/

const verifyRecipeAuthor = async (req, res, next) => {

    try {

        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(recipe.author._id)) {
            return res.status(401).json({ error: "Unathourized - not recipe author!"});
        }

        next();

    } catch (err) {
        res.status(401).json({ message: err.message, stack: err.stack });

    }

}

/* --------------------------------Exports--------------------------------*/

export { verifyRecipeAuthor }