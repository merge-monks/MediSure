import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
  {
   
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
    title: {
      type: String,
    },
    specialty: {
      type: String,
    },
    npiNumber: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    practiceName: {
      type: String,
    },
    practiceType: {
      type: String,
      enum: ["solo", "group", "hospital", "other"],
    },
    ehr: {
      type: String,
    },
    state: {
      type: String,
    },
    termsConsent: {
      type: Boolean,
      default: false,
    },
    hipaaConsent: {
      type: Boolean,
      default: false,
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
