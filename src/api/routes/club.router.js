import express from "express";
import { jwtVerify, isClubHead } from "../middlewares/auth.middleware.js";
import { Profile } from "../controllers/common.controller.js";
// import { userPromotion, getAllUser } from "../controllers/admin.controller.js";
import { createEvent, DeleteEvent, myEvents, updateEvent, userPromotionForClubHead } from "../controllers/clubHead.controller.js";

const router = express.Router();

// V2 Club Routes (Protected/Authenticated)
// router.get("/users", jwtVerify,isClubHead,);
router.get("/profile", jwtVerify, isClubHead, Profile);
router.get("/userPromotion/:id",jwtVerify,isClubHead,userPromotionForClubHead);
// /event CRUD
router.post("/event",jwtVerify,isClubHead,createEvent)
router.get("/myevents",jwtVerify,isClubHead,myEvents)
router.put("/event/update/:id",jwtVerify,isClubHead,updateEvent)
router.delete("/event/delete/:id",jwtVerify,isClubHead,DeleteEvent)


export default router