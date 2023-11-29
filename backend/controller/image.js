import Image from "../model/gallery.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import fs from "fs";

export const uploadImages = async (req, res) => {
  try {
    const files = req.files;
    if (!files) {
      res.status(400).json({ message: "Files not found on server" });
    }

    const uploadToCloudinary = await Promise.all(
      files?.map(async (file) => {
        const localPath = file.path;
        const cloudinaryResponse = await uploadOnCloudinary(localPath);
        if (!cloudinaryResponse) {
          res.status(500).json({ message: "Filed uploading to server failed" });
        }
        fs.unlinkSync(localPath);

        console.log(cloudinaryResponse);
        const image = await Image.create({
          name: cloudinaryResponse.original_filename,
          url: cloudinaryResponse.url,
        });
        console.log(image);

        return cloudinaryResponse;
      })
    );
    res
      .status(200)
      .json({ message: "Files uploaded successfully", uploadToCloudinary });
  } catch (error) {
    res.status(500).json({ message: "File upload to server failed" });
  }
};
export const getAllImages = async (req, res, next) => {};

export const getImage = async (req, res, next) => {};
