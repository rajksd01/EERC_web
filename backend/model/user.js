import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    
    role: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 16);

  next();
});

userSchema.methods.isUserAuthenticated = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
 const token = await jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
  return token
};
const User = mongoose.model("User", userSchema);
export default User;
