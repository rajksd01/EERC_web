import { getImage, getAllImages, uploadImages } from "../controller/image";
import express from "express";
import { upload } from "../middleware/multer.js";

const router = express.router();

router.post(
  "/addimage",
  upload.fields([{ name: "gallery", maxCount: 8 }]),
  uploadImages
);

export default router;
