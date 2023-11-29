import express from "express";
import "dotenv/config";
import conn from "./connection.js";
const app = express();
const router = express.Router();
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import imageRoutes from "./routes/image.js";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(express.json({ limit: "16KB" }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public "));
app.use(express.urlencoded({ extended: true, limit: "16KB" }));
app.use(router);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", imageRoutes);

router.get("/contact", (req, res) => {
  res.send("Connecting backend");
});
router.post("/contact", contactRoutes);
app.listen(3000, () => {
  conn;
  console.log("app running on port number 3000");
});
