const zod = require("zod")
const jwt = require("jsonwebtoken")
const express = require("express")
const bcrypt = require("bcrypt");
const { db } = require("../db/db");

const  JWT_SECRET  = require("../config");
const { userDetails} = require("../db/schema");
const { eq } = require("drizzle-orm");

const router = express.Router();

const signUpSchema = zod.object({
    name:zod.string().min(3),
    password:zod.string().min(6),
    Branch:zod.string(),
    collegeMail:zod.string().email(),
    year:zod.number(),
    techStack:zod.string().optional()

})


    const signinSchema = zod.object({
        collegeMail:zod.string().email(),
        password:zod.string().min(6)
    })



  const saltRound = 10

router.post("/signUp", async(req,res)=>{
    
    const body = req.body;
    const {sucess} = signUpSchema.safeParse(body);
    if(!{sucess}){
        res.json({msg:"Wrong input during signup"})
    }
    // hashing password
        
    const hashPassword = await bcrypt.hash(body.password,saltRound)
    
    const userSchema = userDetails;

    try {
        const userDetails = await db.insert(userSchema).values({
        name:body.name,
        password:hashPassword,
        Branch:body.Branch,
        collegeMail:body.collegeMail,
        year:body.year,
        techStack:body.techStack
     }).returning({insertedId:userSchema.id})
            
     const userId =userDetails[0].insertedId;
     const token = jwt.sign(
                    {userId}
                    ,JWT_SECRET)

                res.json({msg:"User created Succesfully",
                    token
                })
    } catch (error) {
        console.log(error)
    } 
    console.log("hello from signup");
})

        router.post("/signin",async(req,res)=>{

            const body = req.body
            const {success} = signinSchema.safeParse(body)

            if(!success){
                res.json({
                    msg:"Wrong Inputs Email & password"
                })
            }
            
                try {
                     const userDetails1 = await db.select().from(userDetails).where(eq(userDetails.collegeMail,body.collegeMail))
                        const result = await bcrypt.compare(body.password,userDetails1[0].password)
                    // console.log(userDetails1)
                    if(!result){
                        res.json({msg:"Wrong password from signin"})
                    }
                        else{
                         const userId =   userDetails1[0].id
                            const token = jwt.sign(
                                {userId}
                                ,JWT_SECRET)
                                res.json({msg:"Autheniticated Succesfully",
                                    token:token
                                })
                        }
                } catch (error) {
                    console.log(error)
                }   
            


        })





module.exports = router