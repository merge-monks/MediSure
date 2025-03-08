import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
