import express from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { LogOutUser } from "../controllers/user.controller.js";
import { DeleteUser, Profile, UpdateUser } from "../controllers/common.controller.js";

const router = express.Router();

// V1 Routes (Protected/Authenticated)
router.post("/auth/logout", jwtVerify, LogOutUser);
router.get("/profile", jwtVerify, Profile);
router.put("/update",jwtVerify,UpdateUser);
router.delete("/delete",jwtVerify,DeleteUser);
// /profile CRUD
// /event/id/register, /event/id/register/id, /event/id/register/id/id


export default router; 