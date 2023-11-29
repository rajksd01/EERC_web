import {
  getAllImages,
  uploadImages,
  deleteImage,
} from "../controller/image.js";
import express from "express";
import { isLoggedIn } from "../controller/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/addimage", isLoggedIn, upload.array("gallery", 8), uploadImages);

router.get("/allimages", isLoggedIn, getAllImages);

router.post("/deleteimage/:id", isLoggedIn, deleteImage);
export default router;
