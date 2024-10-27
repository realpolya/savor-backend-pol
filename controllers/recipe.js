/* --------------------------------Imports--------------------------------*/
import Recipe from '../models/model-recipe.js'


/* --------------------------------GET Controllers--------------------------------*/

// returns all recipes to client
export const getAllRecipes = async (req, res) => {
    // get all recipes and return them
    try {
        const recipes = await Recipe.find()
            .populate('author')
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json(error)
    }
};

// return single recipe to client by recipe id
export const getSingleRecipe = async (req, res) => {

    try {
        const recipeId = req.params.recipeId
        const foundRecipe = await Recipe.findById(recipeId)
            .populate('author')
        res.status(200).json(foundRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
};


/* --------------------------------POST Controllers--------------------------------*/
export const createRecipe = async (req, res) => {
    try {
        req.body.author = req.user._id;
        const recipe = await Recipe.create(req.body);
        recipe._doc.author = req.user;
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
};
// Need to let the client know what went wrong
/* --------------------------------PUT Controllers--------------------------------*/
export const updateRecipe = async (req, res) => {
    try{
        // const objectToUpdate = await Recipe.findById()
        const recipeId = req.params.recipeId
        const updatedRecipe= await Recipe.findByIdAndUpdate(recipeId, req.body,  { new: true });
        console.log(updatedRecipe);
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json(error)
    }
}

/* --------------------------------DELETE Controllers--------------------------------*/
export const deleteRecipe = async (req, res) => {
    try{
        const recipeId= req.params.recipeId
        const deletedRecipe= await Recipe.findByIdAndDelete(recipeId);
        res.status(201).json(deletedRecipe);
        console.log(deletedRecipe);

    } catch(error){
        res.status(500).json({error: error});
    }
};


