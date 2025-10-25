import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
export const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_KEY, { expiresIn: "1h" });
};
export const userRegistration = async (req, res) => {
  //console.log(req.body);
  const { FullName, Email, Password } = req.body;
  if (!FullName || !Email || !Password) {
    return res.status(400).json({ message: "Not all input value Entered" });
  }
  try {
    const existingUser = await User.findOne({ Email: Email });
    if (existingUser)
      return res.status(400).json({ message: "User is already existed" });
    const user = await User.create({
      FullName,
      Email,
      Password,
    });
    return res.status(201).json({ user, message: "Successfully Registered" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const userLogin = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No Records" });
  }
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ message: "No Enogh records" });
  }
  try {
    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ message: "User is not Registered" });
    }
    const comparedPassword = await user.comparePassword(Password);
    if (!comparedPassword)
      return res.status(400).json({ message: "Incorect Password" });
    res.status(200).json({
      token: generateToken(user._id),
      user,
      message: "Login Successfully.",
    });
  } catch (error) {
    res.status(500).json({ error, message: "Catch Error" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    let token = req.header("Authorization").split(" ")[1];
    //console.log(token);

    if (!token) return res.status(400).json({ message: "no token is saved." });
    const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
    if (
      decoded._id &&
      typeof decoded._id === "string" &&
      decoded._id.startsWith("guest_")
    ) {
      req.user = decoded; // Pass the whole decoded object for guests
      return next();
    }

    // Case 2: Normal user
    if (decoded.id) {
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return res.status(404).json({ message: "User not found." });
      }

      return next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};
