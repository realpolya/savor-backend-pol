/* --------------------------------Imports--------------------------------*/
import Recipe from '../models/model-recipe.js'
import Ingredient from '../models/model-ingredient.js'


/* --------------------------------GET Controllers--------------------------------*/

// returns all recipes to client
export const getAllRecipes = async (req, res) => {
    // get all recipes and return them
    try {
        const recipes = await Recipe.find()
            .populate('author')
            .populate ('ingredients', 'name') //needed to update
        res.status(200).json(recipes)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};

// return single recipe to client by recipe id
export const getSingleRecipe = async (req, res) => {

    try {
        const recipeId = req.params.recipeId
        const foundRecipe = await Recipe.findById(recipeId)
            .populate('author')
            .populate('ingredients', 'name')
        console.log('Fetched Recipe:', recipe);
        res.status(200).json(foundRecipe)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};

//return user's recipes to the client
export const getUserRecipes = async (req, res) => {
    try {
        const authorId = req.user._id // user is logged in so we get id from user data
        const userRecipes = await Recipe.find({author: authorId})
        res.status(200).json(userRecipes)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};

/**
 * Utility function to deal with ingredients on Create and Update
 * @param ingredients Array of names of ingredients
 */
async function saveIngredients(ingredients) {
    console.log(ingredients)
    const ingredientsToSave = await Promise.all( // this makes sure it waits for all async calls in loop resolve and give results back;
        ingredients.map(async (ingredient) => {
            // check if ingredient exists
            // let foundIngredient = await Ingredient.findOne({name: ingredient.trim()}); // should find it
            let foundIngredient = await Ingredient.findById(ingredient); // should find it
            console.log('found ingr is', foundIngredient);

            // if it doesnt find it
            if (!foundIngredient) {
                console.log('ingredient being created')
                foundIngredient = new Ingredient({name: ingredient.trim()});
                await foundIngredient.save();
            }
            return foundIngredient._id
        })
    )
    return [...new Set(ingredientsToSave)];
}

/* --------------------------------Recipe--POST Controller--------------------------------*/
export const createRecipe = async (req, res) => {
    try {
        const ingredients = req.body.ingredients;

        const ingredientsToSave = await saveIngredients(ingredients);

        const recipeToCreate = {
            name: req.body.name,
            prepTime: req.body.prepTime,
            author: req.user._id,
            // we need to populate the ingredients, but they're not just a string,
            // they need to be objectIds because there is a Document/Schema for it. We must reference it
            ingredients: ingredientsToSave,
            description: req.body.description,
            holiday: req.body.holiday,
            image: req.body.image
        }
        ;
        const recipe = await Recipe.create(recipeToCreate);
        recipe._doc.author = req.user
        res.status(201).json(recipe);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};

/* --------------------------------Review--POST Controller--------------------------------*/
export const createReview = async (req, res) => {
    try {
        // find the recipe by id
        const recipe = await Recipe.findById(req.params.recipeId);
        // define the reviewer
        const reviewToAdd = {
            reviewer: req.user._id,
            name: req.body.name,
            text: req.body.text,
            rating: req.body.rating,
        }
        //push the reviews
        recipe.reviews.push(reviewToAdd);
        //save
        await recipe.save();
        //return
        res.status(201).json({
            message: "Review Created Successfully",
            updatedRecipe: recipe
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};
/* --------------------------------PUT Controllers--------------------------------*/
export const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId
        // Find the existing recipe to retain any fields not included in the update body
        const existingRecipe = await Recipe.findById(recipeId);
        if (!existingRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Get the updated ingredients (ensuring ingredient existence in DB)
        const ingredientsToSave = await saveIngredients(req.body.ingredients || []);
        console.log("Ingredients to save:", ingredientsToSave);

        // Merge the existing recipe with the new data
        const updatedRecipeBody = {
            name: req.body.name ? req.body.name : existingRecipe.name,
            prepTime: req.body.prepTime ? req.body.prepTime : existingRecipe.prepTime,
            author: req.user._id, // Always set the current user as author
            ingredients: ingredientsToSave.length ? ingredientsToSave : existingRecipe.ingredients,
            description: req.body.description ? req.body.description : existingRecipe.description,
            holiday: req.body.holiday ?  req.body.holiday : existingRecipe.holiday,
            image: req.body.image ? req.body.image : existingRecipe.image,
        };
        // Update the recipe without deleting missing fields
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            { $set: updatedRecipeBody }, // Use $set to update only provided fields
            { new: true, runValidators: true } // Return the updated recipe with validation
        );
        res.status(200).json({
            message: "Recipe Updated Successfully",
            updatedRecipe: updatedRecipe,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
}
/* --------------------------------Review--PUT Controller--------------------------------*/
export const updateReview = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        const review = recipe.reviews.id(req.params.reviewId);
        console.log(review)
        // if name, text, or name are in the body, then update them, if not keep the original
        review.name = req.body.name ? req.body.name : review.name
        review.text = req.body.text ? req.body.text : review.text
        review.rating = req.body.rating ? req.body.rating : review.rating
        await recipe.save();
        res.status(200).json({message: 'Review Updated Successfully', updatedRecipe: recipe});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};


/* --------------------------------DELETE Controllers--------------------------------*/
export const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({
            message: "Recipe Deleted successfully",
            deletedRecipe: deletedRecipe
        });
        console.log(deletedRecipe);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};

/* --------------------------------Review-DELETE Controller--------------------------------*/
export const deleteReview = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);// find recipe by id.
        const review = recipe.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        recipe.reviews.remove({_id: req.params.reviewId});//array remove() prototype removes an embedded subdocument based on the provided object id {_id:req.params.reviewId})
        await recipe.save();
        res.status(200).json({
            message: 'Review Deleted Successfully',
            updatedRecipe: recipe
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};