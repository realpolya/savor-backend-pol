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
//return user's recipes to the client
export const getUserRecipes= async(req,res)=> {
    try {
        const authorId = req.user._id // user is logged in so we get id from user data
        const userRecipes = await Recipe.find({author: authorId})
        res.status(200).json(userRecipes)
    } catch(error) {
        res.status(500).send(({
            errorMessage: error.message,
            stack: error.stack
        }))
    }
};

/* --------------------------------Recipe--POST Controller--------------------------------*/
export const createRecipe = async (req, res) => {
    try {
        req.body.author = req.user._id
        const recipe = await Recipe.create(req.body);
        recipe._doc.author = req.user
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
};
// Need to let the client know what went wrong

/* --------------------------------Review--POST Controller--------------------------------*/
export const createReview = async (req,res)=> {
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
        res.status(201).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
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
/* --------------------------------Review--PUT Controller--------------------------------*/
export const updateReview = async (req, res) => {
    try{
        const recipe= await  Recipe.findById(req.params.recipeId);
        const review = recipe.reviews.id(req.params.reviewId);
        console.log(review)
        // if name, text, or name are in the body, then update them, if not keep the original
        review.name= req.body.name? req.body.name : review.name
        review.text= req.body.text? req.body.text : review.text
        review.rating= req.body.rating? req.body.rating : review.rating
        await recipe.save();
        res.status(200).json({message: 'Ok'});
    } catch (error){
        res.status(500).json(error)
    }
};



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

/* --------------------------------Review-DELETE Controller--------------------------------*/
export const deleteReview= async(req,res)=> {
    try{
        const recipe= await Recipe.findById(req.params.recipeId);// find recipe by id.
        recipe.reviews.remove({_id:req.params.reviewId}) ;//array remove() prototype removes an embedded subdocument based on the provided object id {_id:req.params.reviewId})
        await recipe.save();
       res.status(200).json({message: 'Ok'});
    }catch(error){
        res.status(500).json({error: error});
    }
};