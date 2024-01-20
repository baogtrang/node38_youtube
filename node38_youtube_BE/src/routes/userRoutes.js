/* USER LIST */
import express from "express";
import storage from "../controllers/uploadControllers.js";
import {
  uploadMultipleAvatars,
  uploadSingleAvatar,
} from "../controllers/userControllers.js";
import { verifyToken, authenticateToken } from "../config/jwt.js";
import uploadCloud from "../config/cloudinary.config.js";

const userRoutes = express.Router();

/* defining API to UPLOAD 1 avatar */
userRoutes.post(
  "/upload-avatar",
  uploadCloud.single("file"),
  uploadSingleAvatar
);

/* defining API to UPLOAD multiple avatars */
userRoutes.post(
  "/upload-avatars",
  uploadCloud.array("files"),
  uploadMultipleAvatars
);

export default userRoutes;
