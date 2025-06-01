import express from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { LogOutUser } from "../controllers/user.controller.js";
import { Profile } from "../controllers/admin.controller.js";

const router = express.Router();

// V1 Routes (Protected/Authenticated)
router.post("/auth/logout", jwtVerify, LogOutUser);
router.get("/profile", jwtVerify, Profile);

// /profile CRUD
// /event/id/register, /event/id/register/id, /event/id/register/id/id


export default router; 