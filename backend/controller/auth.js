import { validationResult } from "express-validator";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0] });
  }
  const { name, email, password, profilePicture, role } = req.body;
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
    res.status(422).json({ error: "User not found" });
  }
  const isAuthenticated = await user.isUserAuthenticated(password);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    res.status(401).json({ error: "password donot match" });
  }

  const token = await user.generateAccessToken();

  res
    .status(200)
    .cookie("token", token, { expiresIn: "1d" })
    .json({ message: "User Logged In successfully", token: token });
};
export const logOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signout successfully!" });
};

export const isLoggedIn = async (req, res, next) => {
  const userToken =await req.cookies.token;
  console.log(userToken)
  if (!userToken) {
    res.status(404).json({ message: "User not loggedin" });
  }
  try {
    const verifiedStatus =await  jwt.verify(userToken, process.env.SECRET);
    console.log(verifiedStatus)
    req.user = verifiedStatus;
    if(verifiedStatus){
      next()
    }

   
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "User not authorized" });
  }
};
// protected routes

// export const isSignedIn = expressjwt({
//   secret: process.env.SECRET,
//   userProperty: "auth",
//   algorithms: ["HS256"],
// });
// custom middlewares

// export const isAuthenticated = (req, res, next) => {
//   let checker = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!checker) {
//     return res.status(403).json({ error: "Access Denied" });
//   }
//   next();
// };

// export const isAdmin = (req, res, next) => {
//   if (req.profile.role === "admin") {
//     return res.status(403).json({ error: "Admin access only." });
//   }
//   next();
// };
