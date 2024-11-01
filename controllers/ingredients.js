/* --------------------------------Imports--------------------------------*/
import Ingredient from '../models/model-ingredient.js'

/* --------------------------------GET Controllers--------------------------------*/

// returns all ingredients to client
export const getAllIngredients = async (req, res) => {
    // get all ingredients and return them
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};