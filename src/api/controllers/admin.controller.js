import { eq, not } from "drizzle-orm";
import db from "../../db/db.js";
import { userDetails } from "../../db/schema/schema.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

//Getting list of user by admin
const getAllUser = async (req, res) => {
  const user = req.user;
  const result = await db
    .select()
    .from(userDetails)
    .where(not(eq(userDetails.userId, user[0].userId)));
  // console.log(result)
  if (!result) {
    return res.status(401).json({ msg: "Something went wrong data not found" });
  }
  res.status(200).json({ msg: "All user details", users: result});
};



const userPromotion = async (req,res) =>{
  // const user = req.user
  const {roles} = req.body
  const idToPromote = req.query

  if(!(roles==="admin" || roles === "club" || roles === "user" || roles === "reprsentative")){
    return res.stauts(502).json({msg:"Invaild fields"})
  }
  const result = await db.update(userDetails).set({roles:roles}).where(eq(userDetails.userId,idToPromote)).returning()
  const roleAfter = result[0]?.roles 

  if(!result){
    return res.status(501).json({msg:"Error Something went wrong",role:roleAfter})
  }

  return res.status(200).json({msg:"User Promoted successfully"})
} 

export { getAllUser, Profile,userPromotion };
