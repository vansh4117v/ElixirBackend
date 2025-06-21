import express from "express";
import { jwtVerify, isAdmin } from "../middlewares/auth.middleware.js";
import { Profile } from "../controllers/common.controller.js";
import { userPromotion, getAllUser } from "../controllers/admin.controller.js";

const router = express.Router();

// V1 Admin Routes (Protected/Authenticated)
router.get("/users", jwtVerify, isAdmin, getAllUser);
router.get("/profile", jwtVerify, isAdmin, Profile);
router.get("/userPromotion",jwtVerify,isAdmin,userPromotion);
// /event CRUD

// /mentor CRUD
// /user promotion

// optional
// /team CRUD
// /project CRUD
// /blog CRUD


export default router; 