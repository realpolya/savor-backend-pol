/* --------------------------------Imports--------------------------------*/
import Favorites from "../models/model-favorite.js";
import Recipe from "../models/model-recipe.js"

/* --------------------------------GET Controllers--------------------------------*/
export const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const favorites = await Favorites.findOne({owner: userId})
        if (!favorites) {
            res.status(404).json({
                message: "Favorites for User Not Found"
            })
        }
        res.status(200).json(favorites)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
}



/* --------------------------------POST Controllers--------------------------------*/
export const addToFavorites = async (req, res) => {
    try{
        const userId = req.user._id;
        const recipeId = req.params.recipeId;
        // check that the recipe that needs to be added to favorites exists
        const recipe= await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Find the user's Favorites List
        let favorites = await Favorites.findOne({owner: userId})
        console.log('favorites', favorites);


        if (!favorites) {
            favorites = await Favorites.create({owner: userId, recipe: []})
        }

        console.log(favorites.recipes);


        // Check if Recipe exists in user's favorites already
        if (favorites.recipes.includes((recipeId))){
            return res.status(400).json({ message: "Recipe already exists in favorites" });
        }

        // Add recipe to favorites
        favorites.recipes.push(recipeId);
        await favorites.save()
        res.status(200).json({
            message: 'Recipe saved to Favorites Successfully',
            favorites: favorites
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};
/* --------------------------------PUT Controllers--------------------------------*/
export const removeRecipeFromFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const recipeId = req.params.recipeId;
        // Find the user's Favorites List
        let favorites = await Favorites.findOne({owner: userId})
        if (!favorites) {
            return res.status(404).json({ message: "Favorites list not found" });
        }

        // Check if the Recipe exists in the user's favorites
        const recipeIndex = favorites.recipes.indexOf(recipeId); // Find the index of the recipe

        if (recipeIndex === -1) {
            return res.status(404).json({ message: "Recipe does not exist in user's favorites" });
        }

        // Remove the recipe from the favorites array
        favorites.recipes.splice(recipeIndex, 1); // Remove the recipe at the found index

        // Save the updated favorites list
        await favorites.save();
        res.status(200).json({
            message: "Recipe Removed from Favorites Successfully",
            updatedFavorites: favorites
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
}



