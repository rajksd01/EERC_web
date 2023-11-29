import { validationResult } from "express-validator";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0] });
  }
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(500).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  user.password = undefined;
  user.role = undefined;
  res.status(200).send(user);
};

export const logIn = async (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0] });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({ error: "User not found" });
  }
  const isAuthenticated = await user.isUserAuthenticated(password);

  if (!isAuthenticated) {
    return res.status(401).json({ error: "password donot match" });
  }

  const token = await user.generateAccessToken();

  return res
    .status(200)
    .cookie("token", token, { httpOnly: true, expiresIn: "1d" })
    .json({ message: "User Logged In successfully", token: token });
};
export const logOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signout successfully!" });
  return;
};

export const isLoggedIn = async (req, res, next) => {
  const userToken = await req.cookies.token;

  if (!userToken) {
    res.status(404).json({ message: "User not loggedin" });
  }
  try {
    const verifiedStatus = await jwt.verify(userToken, process.env.SECRET);

    if (verifiedStatus) {
      next();
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "User not authorized" });
  }
};
