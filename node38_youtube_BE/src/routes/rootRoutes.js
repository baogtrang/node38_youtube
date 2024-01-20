import express from "express";
import videoRoutes from "./videoRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const rootRoutes = express.Router();
rootRoutes.use("/video", videoRoutes);
rootRoutes.use("/user", userRoutes);
rootRoutes.use("/auth", authRoutes);

export default rootRoutes;
