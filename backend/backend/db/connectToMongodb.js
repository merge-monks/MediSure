import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Admin:8O7DIPsUZ1AG65hy@cluster0.rkdoows.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
