import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  const userDetails = await User.findOneById(req.session.userId);

  if (!userDetails) {
    res.status(400).json({ result: "Invalid User" });
  }
  //If success return 200 okk
  res.status(200).json(userDetails);
};

export const updateUser = async (req, res) => {
  const userDetails = await User.findOneById(req.session.userId);

  if (!userDetails) {
    res.status(400).json({ result: "Invalid User" });
  }

  const { displayName, gender, dob } = req.body;

  if (displayName) {
    userDetails.displayName = displayName;
  }

  if (gender) {
    userDetails.gender = gender;
  }

  if (dob) {
    userDetails.dob = dob;
  }

  await userDetails.save();

  //If success return 200 okk
  res.status(200).json({ result: "Success" });
};
