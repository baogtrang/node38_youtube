import express from "express";
import {
  login,
  loginFacebook,
  signUp,
} from "../controllers/authControllers.js";

const authRoutes = express.Router();
// authentication, authorization
authRoutes.post("/login", login);
authRoutes.post("/signup", signUp);
authRoutes.post("/login-facebook", loginFacebook);

export default authRoutes;
