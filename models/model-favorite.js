import mongoose from "mongoose";

export default mongoose.model("Favorites", new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      recipe: {
        type: Array,
        default: [],
        ref: "Recipe",
      }
    },
    { timestamps: true }
));