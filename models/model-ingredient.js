import mongoose from "mongoose";

export default mongoose.model("Ingredient", new mongoose.Schema(
    {
      name: {
        type: String,
      },
    },
    { timestamps: true }
));
