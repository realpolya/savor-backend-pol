import mongoose from "mongoose";

export default mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      require: true,
    },
    hashedPassward: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  }).set(
    "toJSON",
    {
      transform: (document, returned) => {
        delete returned.hashedPassword;
      },
    },
    { timestamps: true }
  )
);
