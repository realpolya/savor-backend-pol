/* --------------------------------Imports--------------------------------*/

import Recipe from '../models/model-recipe.js';

/* --------------------------------Middleware Function--------------------------------*/

// compare logged in user to the review owner (PUT and DELETE routes)
const verifyReviewAuthor = async (req, res, next) => {

    console.log('Review author not verified')

    try {

        const recipe = await Recipe.findById(req.params.recipeId);

        const review = recipe.reviews.find(review => {
            return JSON.stringify(req.params.reviewId) === JSON.stringify(review._id);
        });

        if (JSON.stringify(req.user._id) !== JSON.stringify(review.reviewer._id)) {
            return res.status(401).json({ error: "Unauthorized!"});
        }

        next();

    } catch (err) {

        res.status(401).json({ err: "We have an issue" });

    }

}

/* --------------------------------Exports--------------------------------*/

export { verifyReviewAuthor }