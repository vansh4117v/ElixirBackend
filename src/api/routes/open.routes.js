import express from "express";
import { SignUpController, SignInController, refreshToken } from "../controllers/user.controller.js";
import { getAllEvent } from "../controllers/common.controller.js";

const router = express.Router();

// V0 Routes (Public/Non-authenticated)
router.post("/signup", SignUpController);
router.post("/signin", SignInController);
router.post("/refresh-token", refreshToken);

//Getting all event

router.get("/event",getAllEvent)

// /signup
// /event, /event/:id, 
// /mentor, /mentor/:id
// /team, /team/:id
// /project, /project/:id
// /blog, /blog/:id


export default router; 