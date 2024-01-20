import express from "express";
import {
  createVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../controllers/videoControllers.js";
import { authenticateToken } from "../config/jwt.js";

const videoRoutes = express.Router();
videoRoutes.get("/get-video/:page/:size", authenticateToken, getVideo);
videoRoutes.post("/create-video", createVideo);
videoRoutes.delete("/delete-video/:videoId", deleteVideo);
videoRoutes.put("/update-video/:videoId", updateVideo);

export default videoRoutes;
