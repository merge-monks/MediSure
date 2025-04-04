import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//CREATING AN ACCOUNT FROM HERE
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      title,
      specialty,
      npiNumber,
      licenseNumber,
      practiceName,
      practiceType,
      ehr,
      state,
      termsConsent,
      hipaaConsent
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await signupChecks({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      title,
      specialty,
      npiNumber,
      licenseNumber,
      practiceName,
      practiceType,
      ehr,
      state,
      termsConsent,
      hipaaConsent
    });

    if (result !== true) {
      return res.status(400).json({ error: result.error });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      title,
      specialty,
      npiNumber,
      licenseNumber,
      practiceName,
      practiceType,
      ehr,
      state,
      termsConsent,
      hipaaConsent
    });

    await newUser.save();

    req.session.userId = newUser._id;

    res.status(200).json({ result: req.session.userId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

async function signupChecks({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  title,
  specialty,
  npiNumber,
  licenseNumber,
  practiceName,
  practiceType,
  state,
  termsConsent,
  hipaaConsent
}) {
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return { error: "Email is already in use" };
  }

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return { error: "Please fill all required fields" };
  }

  if (!title || !specialty || !npiNumber || !licenseNumber) {
    return { error: "Professional details are required" };
  }

  if (!practiceName || !practiceType || !state) {
    return { error: "Practice information is required" };
  }

  if (!termsConsent || !hipaaConsent) {
    return { error: "You must agree to the terms and HIPAA compliance" };
  }

  if (password.length < 8) {
    return { error: "Password should be at least 8 characters" };
  }

  if (!isValidEmail(email)) {
    return { error: "Invalid email format" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

export const login = async (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ error: "You are already logged in." });
  }

  const { email, password } = req.body;

  console.log(email + " " + password);

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Incorrect username or password"});
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Incorrect username or password" });
  }

  req.session.userId = user._id;

  //If success return 200 ok with user ID
  res.status(200).json({ 
    result: req.session.userId,
    userId: user._id // Include the user ID in response
  });
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

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};
