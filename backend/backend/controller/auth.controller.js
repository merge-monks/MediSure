import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//CREATING AN ACCOUNT FROM HERE
export const signup = async (req, res) => {
  try {
    const { displayName, email, password, confirmPassword } = req.body;
    //Salting and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Function to check if all the details are inputted correctly
    const result = await signupChecks({
      displayName,
      email,
      password,
      confirmPassword,
    });

    //If details are not correct then sends a error response
    if (result !== true) {
      return res.status(400).json({ error: result.error });
    }

    //If it is able to pass every check create a new user
    const newUser = new User({
      displayName,
      email,
      password: hashedPassword,
    });

    //Saving it to the database
    await newUser.save();

    req.session.userId = newUser._id;

    //Account has been created response
    res.status(200).json({ result: req.session.userId });
  } catch (err) {
    //Incase there is an error
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Function to check the details if they are correct or not
async function signupChecks({ displayName, email, password, confirmPassword }) {
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return { error: "Email is already in use" };
  }

  if (!password || !displayName || !confirmPassword || !email) {
    return { error: "Please fill all fields" };
  }

  if (displayName.length < 5) {
    return { error: "Names should be greater than 4 letters" };
  }

  if (password.length < 5) {
    return { error: "Names should be greater than 4 letters" };
  }

  if (!isValidEmail(email)) {
    return { error: "Invalid email format" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  return true;
}

//Check if its a valid email
function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

//LOGING IN ACCOUNT
export const login = async (req, res) => {
  //Check if already logged in
  if (req.session.userId) {
    return res.status(200).json({ error: "You are already logged in." });
  }

  //Request payload
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  //Search for the user and gets the details
  const user = await User.findOne({ email });

  //Decrypt and compare the password -- returns true or fals
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );

  //If incorrect return 400 error
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Incorrect username or password" });
  }

  //Create a session
  req.session.userId = user._id;

  //If success return 200 okk
  res.status(200).json({ result: req.session.userId });
};

//Logout of account
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("AuthCookie");
    res.json({ result: "Logout successful" });
  });
};
