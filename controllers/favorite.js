/* --------------------------------Imports--------------------------------*/
import Favorites from "../models/model-favorite.js";
import Recipe from "../models/model-recipe.js"

/* --------------------------------GET Controllers--------------------------------*/

const getFavorites = async (req, res) => {

    try {

        const favorites = await Favorites.findOne({owner: req.user._id}).populate({
            path: 'recipes',
            populate: {
                path: 'author',
            }
        })

        if (!favorites) {
            return res.status(404).json({
                message: "Favorites for User Not Found"
            })
        }

        res.status(200).json(favorites)

    } catch (error) {

        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
}

/* --------------------------------POST Controllers--------------------------------*/

const addToFavorites = async (req, res) => {

    try {

        const recipe= await Recipe.findById(req.params.recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        let favorites = await Favorites.findOne({owner: req.user._id})

        if (!favorites) {
            favorites = await Favorites.create({owner: req.user._id, recipe: []})
        }

        if (favorites.recipes.includes((req.params.recipeId))){
            return res.status(400).json({ message: "Recipe already exists in favorites" });
        }

        favorites.recipes.push(req.params.recipeId);

        await favorites.save()

        res.status(200).json({
            message: 'Recipe saved to Favorites Successfully',
            favorites: favorites
        });

    } catch(error) {

        res.status(500).json({
            message: error.message,
            stack: error.stack
        });

    }
};
/* --------------------------------PUT Controllers--------------------------------*/

const removeFromFavorites = async (req, res) => {

    try {

        let favorites = await Favorites.findOne({owner: req.user._id})
        if (!favorites) {
            return res.status(404).json({ message: "Favorites list not found" });
        }

        const recipeIndex = favorites.recipes.indexOf(req.params.recipeId);

        if (recipeIndex === -1) {
            return res.status(404).json({ message: "Recipe does not exist in user's favorites" });
        }

        favorites.recipes.splice(recipeIndex, 1);

        await favorites.save();

        res.status(200).json({
            message: "Recipe Removed from Favorites Successfully",
            updatedFavorites: favorites
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
            stack: error.stack
        });

    }
}

/* --------------------------------Exports--------------------------------*/

export { getFavorites, addToFavorites, removeFromFavorites }