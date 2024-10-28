import mongoose from "mongoose";

 const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
});

export default mongoose.model("Recipe", new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      prepTime: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User",
      },
      ingredients: {
        type: Array,
        default: [],
      },
      description: {
        type: String,
        required: true,
      },
      holiday: {
        type: String,
        required: true,
        enum: [
          "Not a Holiday",
          "Christmas",
          "Thanksgiving",
          "Easter",
          "Halloween",
        ],
      },
      image: {
        type: String,
      },
      reviews: [reviewSchema],
    },
    { timestamps: true }
  )
);
