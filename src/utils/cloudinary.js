import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //uplode the file on cloudinay server
    const response = await cloudinary.uploadFileToCloudinary(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded sucessfully
    console.log("file uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the loacally saved temporary file as the upload failed
    return null;
  }
};

export {uploadToCloudinary};