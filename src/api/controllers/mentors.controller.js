import { z } from "zod";
import db from "../../db/db.js";
import { mentorDetails } from "../../db/schema/schema.js";
import { createMentorSchema, updateMentorSchema } from "../validators/vaildation.js";
import { eq } from "drizzle-orm";
import uuid4 from "uuid4";

const idParamSchema = z.object({
  id: z.string({ required_error: "Mentor ID is required" }).uuid("Mentor ID must be a valid UUID"),
});

export const getMentorById = async (req, res) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ msg: "Invalid mentor ID format" });
    }
    const { id } = parsed.data;
    const mentor = await db.select().from(mentorDetails).where(eq(mentorDetails.id, id));
    if (mentor.length === 0) {
      return res.status(404).json({ msg: "Mentor not found" });
    }
    return res.status(200).json(mentor[0]);
  } catch (error) {
    console.error("Error fetching mentor by ID:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateMentor = async (req, res) => {
  try {
    const idCheck = idParamSchema.safeParse(req.params);
    if (!idCheck.success) {
      return res.status(400).json({ msg: "Invalid mentor ID format" });
    }
    const { id } = idCheck.data;

    const bodyCheck = updateMentorSchema.safeParse(req.body);
    if (!bodyCheck.success) {
      return res.status(400).json({ msg: "Invalid update fields", errors: bodyCheck.error.flatten().fieldErrors });
    }
    const updates = bodyCheck.data;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ msg: "No valid fields provided for update" });
    }

    const existing = await db.select().from(mentorDetails).where(eq(mentorDetails.id, id));
    if (existing.length === 0) {
      return res.status(404).json({ msg: "Mentor not found" });
    }

    const updatedMentor = await db.update(mentorDetails).set(updates).where(eq(mentorDetails.id, id)).returning();

    if (!updatedMentor.length) {
      return res.status(500).json({ msg: "Failed to update mentor" });
    }

    return res.status(200).json({ msg: "Mentor updated successfully", mentor: updatedMentor[0] });
  } catch (error) {
    console.error("Error updating mentor:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteMentor = async (req, res) => {
  try {
    const idCheck = idParamSchema.safeParse(req.params);
    if (!idCheck.success) {
      return res.status(400).json({ msg: "Invalid mentor ID format" });
    }

    const { id } = idCheck.data;
    const deleted = await db.delete(mentorDetails).where(eq(mentorDetails.id, id)).returning();
    if (deleted.length === 0) {
      return res.status(404).json({ msg: "Mentor not found" });
    }

    return res.status(200).json({ msg: "Mentor deleted successfully", mentor: deleted[0] });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const createMentor = async (req, res) => {
  try {
    const bodyCheck = createMentorSchema.safeParse(req.body);
    if (!bodyCheck.success) {
      return res.status(400).json({ msg: "Invalid mentor data", errors: bodyCheck.error.flatten().fieldErrors });
    }
    const mentorData = bodyCheck.data;
    const newMentor = await db
      .insert(mentorDetails)
      .values({
        id: uuid4(),
        name: mentorData.name,
        image: mentorData.image,
        discord: mentorData.discord || null,
        linkedIn: mentorData.linkedIn,
        techStack: mentorData.techStack,
        bannerKeywords: mentorData.bannerKeywords || null,
      })
      .returning();
    if (newMentor.length === 0) {
      return res.status(500).json({ msg: "Failed to create mentor" });
    }
    return res.status(201).json({ msg: "Mentor created successfully", mentor: newMentor[0] });
  } catch (error) {
    console.error("Error creating mentor:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await db.select().from(mentorDetails)
    return res.status(200).json(mentors);
  } catch (error) {
    console.error("Error fetching all mentors:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
