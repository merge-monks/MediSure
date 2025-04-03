import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://himanshuverma:RVlJtQyhCXP7z3eq@cluster0.ug6bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
