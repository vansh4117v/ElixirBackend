import { and, eq, not } from "drizzle-orm";
import db from "../../db/db.js";
import { eventDetails, userDetails } from "../../db/schema/schema.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import { updateEventSchema } from "../validators/vaildation.js";

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
  const idToPromote = req.params.id

  if(!( roles === "admin" || roles === "club" || roles === "user" || roles === "reprsentative")){
    return res.stauts(502).json({msg:"Invaild fields"})
  }
  const result = await db.update(userDetails).set({roles:roles}).where(eq(userDetails.userId,idToPromote)).returning()
  const roleAfter = result[0]?.roles 

  if(!result){
    return res.status(501).json({msg:"Error Something went wrong",role:roleAfter})
  }

  return res.status(200).json({msg:"User Promoted successfully"})
}


const updateEvent = async(req,res) =>{
    const { userId } = req.user
    const body = req.body
    const eventId = req.params.id
    const {success} = updateEventSchema.safeParse(body)

    if(!success){
        return res.status(403).json({ msg: "Wrong input during creating event" });
    }
    try {
    // Check if event already exists
    const [existingEvent] = await db.select().from(eventDetails).where(eq(eventDetails.eventId,eventId));

    if (!existingEvent) {
      return res.status(401).json({ msg: "Event with name not exists" });
    }

    const [ result ] = await db
                    .update(eventDetails)
                    .set(body)
                    .where(eq(eventDetails.eventId,eventId))
                    .returning()

    if(!result){
        return res.status(502).json({msg:"User not updated, Something went wrong"})
    }
    console.log(result)
    return res.status(200).json({msg:"User updated succesfully",updatedEvent:result})

    }catch(e){
        console.log("Error from updateEvent",e)
        return res.status(401).json({msg:"Error while updateing event"})

    }
    
}


const DeleteEvent = async(req,res) =>{
    const {userId} = req.user
    const eventId = req.params.id

    // Check if event already exists
    try{const [existingEvent] = await db.select().from(eventDetails).where(eq(eventDetails.eventId,eventId));

    if (!existingEvent) {
      return res.status(401).json({ msg: "Event not exists" });
    }
    
    const result  = await db.delete(eventDetails).where(eq(eventDetails.eventId,eventId))
    if(!result){
        return res.status(502).json({msg:"Event not deleted, Something went wrong"})
    }

    return res.status(200).json({msg:"Event deleted succesfully"})
    
    }catch(error){
        console.log("Error from DeleteEvent",error)
        return res.status(502).json({msg:"Event not deleted, Something went wrong"})
    }
}

export { getAllUser, userPromotion, updateEvent,DeleteEvent };
