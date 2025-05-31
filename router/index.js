import express from "express";
import userRouter from "./user.js"
import adminRouter from "./adminRouter.js"
const router = express.Router()
import {} from 'dotenv/config'
// import { SignInController } from "../controllers/user.controler.js";
// import RoleBased from "../middlewares/roleBased.middleware.js";
// import jwtVerify from "../middlewares/auth.middleware.js";


//role based 
// router.use(jwtVerify,RoleBased)
router.use('/admin', adminRouter)
router.use('/user', userRouter)


export default router;