import express from "express";
import { jwtVerify, isAdmin } from "../middlewares/auth.middleware.js";
import { Profile } from "../controllers/common.controller.js";
import { userPromotion, getAllUser, updateEvent, DeleteEvent } from "../controllers/admin.controller.js";
import { createEvent, myEvents } from "../controllers/clubHead.controller.js";
import { createMentor, deleteMentor, updateMentor } from "../controllers/mentors.controller.js";

const router = express.Router();

// V1 Admin Routes (Protected/Authenticated)
router.get("/users", jwtVerify, isAdmin, getAllUser);
router.get("/profile", jwtVerify, isAdmin, Profile);
router.get("/userPromotion/:id",jwtVerify,isAdmin,userPromotion);
// /event CRUD
router.post("/event",jwtVerify,isAdmin,createEvent)
router.get("/myevents",jwtVerify,isAdmin,myEvents)
router.put("/event/update/:id",jwtVerify,isAdmin,updateEvent)
router.delete("/event/delete/:id",jwtVerify,isAdmin,DeleteEvent)

// /mentor CRUD
router.post("/mentor", jwtVerify, isAdmin, createMentor);
router.patch("/mentor/:id", jwtVerify, isAdmin, updateMentor);
router.delete("/mentor/:id", jwtVerify, isAdmin, deleteMentor);

// /user promotion

// optional
// /team CRUD
// /project CRUD
// /blog CRUD


export default router; 