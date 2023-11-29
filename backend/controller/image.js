import Image from "../model/gallery.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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
          public_id: cloudinaryResponse.public_id,
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
// to fetch all images
export const getAllImages = async (req, res) => {
  const images = await Image.find();

  res.status(200).json({ message: "Images Retrieved", images });
};

// to delete a image
export const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await Image.findById({ _id: imageId });

    const publicId = image?.public_id;
    const cloudinaryDeletedResult = await deleteFromCloudinary(publicId);
    console.log(cloudinaryDeletedResult);

    if (!cloudinaryDeletedResult || cloudinaryDeletedResult !== "ok") {
      return res
        .status(404)
        .json({ message: "Image couldn't be deleted from Cloudinary" });
    }
    const databaseresult = await Image.deleteOne({ _id: imageId });
    console.log(databaseresult);
    if (!databaseresult) {
      return res
        .status(500)
        .json({ message: "Image coudln't be deleted from database", error });
    }
    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Image coudln't be deleted", error });
  }
};
