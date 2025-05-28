
import express from "express";

import { SignUpController, LogOutUser,SignInController, refreshToken } from "../controllers/user.controler.js"
import jwtVerify from "../middlewares/auth.middleware.js"
const router = express.Router();


 try {
  router.post("/signUp",SignUpController)
  router.post("/signin",SignInController)
  router.post("/logout",jwtVerify,LogOutUser)
  router.post("/refresh-token",refreshToken)
 } catch (error) {
  console.log(error)
 } 


export default router