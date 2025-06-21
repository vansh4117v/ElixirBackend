import express from "express";
import { jwtVerify, isClubHead } from "../middlewares/auth.middleware.js";
import { Profile } from "../controllers/common.controller.js";
import { userPromotion, getAllUser } from "../controllers/admin.controller.js";

const router = express.Router();

// V1 Admin Routes (Protected/Authenticated)
router.get("/users", jwtVerify,isClubHead,);
router.get("/profile", jwtVerify, isClubHead, Profile);
router.get("/userPromotion",jwtVerify,isClubHead,userPromotion);