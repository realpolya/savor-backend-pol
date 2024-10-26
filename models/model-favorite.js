import mongoose from "mongoose";

export default mongoose.model(
  "Favorite",
  new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    },
    { timestamps: true }
  )
);
