import { userDetails } from"../db/schema.js"

import db from "../db/db.js"

import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm"

 const jwtVerify = async(req,res,next)=>{
   try {
    console.log(req.cookies.accessToken)
    const token = req?.cookies?.accessToken || req.header("Authorization").replace("Bearer ","")
    if(!token){
       return res.status(400).json({msg:"Unauthorized request"})
    }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

    const user = await db.select().from(userDetails).where(eq(userDetails.userId,decodedToken?.userId))
    if(!user){
       return res.status(400).json({msg:"Unauthorized request"})
    }
    else{
        req.user = user
        next()
    }
   } catch (error) {
    console.error("Error from jwt Verify",error)
   }
    
} 

export default jwtVerify
