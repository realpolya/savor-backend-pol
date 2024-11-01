import mongoose from "mongoose";

export default mongoose.model("User", new mongoose.Schema({
      username: {
        type: String,
        require: true,
      },
      hashedPassword: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
    },
    { timestamps: true })
  .set("toJSON", {
      transform: (document, returned) => {
        delete returned.hashedPassword;
      },
}));