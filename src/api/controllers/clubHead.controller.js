import { and, eq } from "drizzle-orm";
import db from "../../db/db";
import { eventDetails } from "../../db/schema/schema";
import { eventSchema } from "../validators/vaildation"
import uuid4 from "uuid4";

export const createEvent = async(req,res) =>{
    const body = req.body
    const { userId } = req.user
    const {success} = eventSchema.safeParse(body)

    if(!success){
        return res.json({ msg: "Wrong input during creating event" });
    }

    try {
    // Check if event already exists
    const [existingEvent] = await db.select().from(userDetails).where(eq(eventDetails.name, body.name));

    if (existingEvent) {
      return res.status(401).json({ msg: "Event with name already exists" });
    }

    
    //generating uuid for event
    
        const id = uuid4();

        const result = await db.insert(eventDetails).values({
            eventId:id,
              name:body.name,
              startDate:body.startDate,
              endDate:body.endDate,
              imageUrl:body.imageUrl,
              description:body.description,
              registrationLink:body.registrationLink,
              documentLink:body.documentLink,
              clubName:body.clubName,
              ticketPrice:body.ticketPrice,
              location:body.location,
              createdBy:userId
        }).returning({registrationLink,eventId})

        const eventId = result[0].eventId
        if (!eventId) {
         return res.status(401).json({ msg: "Event not created" });
            } 
        else{
            return res.status(200).json({msg:"Event created Successfully",registrationLink,eventId})
        }

    
    }catch(e){
        return res.status(501).json("Error while creating event")
    }
}

export const myEvents = async(req,res) =>{
    const { userId } = req.user

    const result = await db.select().from(eventDetails).where(eq(eventDetails.createdBy,userId))
    if(![result]){
        return res.stauts(401).json({msg:"no event found"})

    }
    else{
        return res.stauts(200).json({msg:"Your Events ",events:result})
    }
}

export const updateEvent = async(req,res) =>{
    const { userId } = req.user
    const body = req.body
    const eventId = req.params.id
    const {success} = eventSchema.safeParse(body)

    if(!success){
        return res.json({ msg: "Wrong input during creating event" });
    }
    try {
    // Check if event already exists
    const [existingEvent] = await db.select().from(eventDetails).where(and(eq(eventDetails.eventId,eventId),eq(eventDetails.createdBy,userId)));

    if (!existingEvent) {
      return res.status(401).json({ msg: "Event with name not exists" });
    }

    const result = await db
                    .update(eventDetails)
                    .set(body)
                    .where(and(eq(eventDetails.eventId,eventId),eq(eventDetails.createdBy,userId)))
                    .returning()

    if(!result){
        return res.status(502).json({msg:"User not updated, Something went wrong"})
    }

    return res.status(200).json({msg:"User updated succesfully",updatedEvent:result[0]})

    }catch(e){
        console.log("Error from updateEvent",e)
        return res.status(401).json({msg:"Error while updateing event"})

    }
    
}

export const DeleteEvent = async(req,res) =>{
    const {userId} = req.user
    const eventId = req.params.id

    // Check if event already exists
    try{const [existingEvent] = await db.select().from(eventDetails).where(and(eq(eventDetails.eventId,eventId),eq(eventDetails.createdBy,userId)));

    if (!existingEvent) {
      return res.status(401).json({ msg: "Event not exists" });
    }
    
    const result = await db.delete(eventDetails).where(and(eq(eventDetails.eventId,eventId),eq(eventDetails.createdBy,userId)))
    if(!result){
        return res.status(502).json({msg:"Event not deleted, Something went wrong"})
    }

    return res.status(200).json({msg:"Event deleted succesfully"})
    
    }catch(error){
        console.log("Error from DeleteEvent",error)
        return res.status(502).json({msg:"Event not deleted, Something went wrong"})
    }
}
