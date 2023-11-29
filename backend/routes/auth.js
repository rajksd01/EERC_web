import express from "express";
const router = express.Router();
import { check } from "express-validator";

import { register, logIn, logOut } from "../controller/auth.js";

//For signup
router.post(
  "/register",
  [
    // name validation
    check("name").isLength({ min: 3 }),
    //email validation
    check("email").isEmail(),
    //Password validation
    check("password", "The password must be 5+ chars long and contain a number")
      .not()
      .isIn(["123", "password", "god"])
      .withMessage("Do not use a common word as the password")
      .isLength({ min: 5 })
      .matches(/\d/),
  ],
  register
);

// For Siggn in

router.post("/login", logIn);

//For signout
router.get("/logout", logOut);

// router.get("/test", isSignedIn, (req, res) => {
//   res.send("A protected route");
// });
export default router;
