import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// config to connect to Cloudinary server
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// this part is quite similar to uploadControllers.js
// Cloudinary storage setup for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "mp4"],
  filename: (req, file, cb) => {
    // names saved on the server
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });
export default uploadCloud;
