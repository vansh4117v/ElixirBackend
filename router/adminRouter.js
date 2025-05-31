import express from "express";
import { jwtVerify,isAdmin } from "../middlewares/auth.middleware.js";
import {Profile, getAllUser } from "../controllers/admin.controller.js";

const router = express.Router()

router.get("/allUser",jwtVerify,isAdmin,getAllUser)
router.get("/profile",jwtVerify,isAdmin,Profile)


export default router