import { userDetails } from"../db/schema.js"

import db from "../db/db.js"

import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm"

// verifying JWT

 const jwtVerify = async(req,res,next)=>{
   try {
   //  console.log(req.cookies.accessToken)
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



// Verifying user is ADMIN or not
const isAdmin = (req,res,next)=>{
  const user =req.user
   console.log()
   if(user[0].collegeMail == process.env.ADMIN_MAIL){
               req.isAdmin = true;
               next()
            }
            else{
              return res.status(500).json({msg:"User is not an admin"})
            }
}


// Verifying User is Cub head or not
const isClubHead = (req,res) =>{
   const user = req.user
   if(user[0].isClubHead){
      next()
   }
   else{
     return res.status(500).json({msg:"User is not an admin"})
   }
}

export {
   jwtVerify,
   isAdmin,
   isClubHead
} 
