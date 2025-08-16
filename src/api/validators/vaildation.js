import zod from "zod";

const signUpSchema = zod.object({
  firstName: zod.string().min(3),
  lastName:zod.string().min(2),
  password: zod.string().min(6),
  Branch: zod.string(),
  collegeMail: zod.string().email(),
  year: zod.number(),
  techStack: zod.string().optional(),
});

const signinSchema = zod.object({
  collegeMail: zod.string().email(),
  password: zod.string().min(6),
});

const eventSchema = zod.object({
    name:zod.string().min(3),
    startDate:zod.string(),
    endDate:zod.string(),
    imageUrl:zod.string(),
    description:zod.string(),
    registrationLink:zod.string(),
    documentLink:zod.string(),
    clubName:zod.string(),
    ticketPrice:zod.number(),
    location:zod.string(),
})

const updateEventSchema = zod.object({
    name:zod.string().min(3).optional(),
    startDate:zod.string().optional(),
    endDate:zod.string().optional(),
    imageUrl:zod.string().optional(),
    description:zod.string().optional(),
    registrationLink:zod.string().optional(),
    documentLink:zod.string().optional(),
    clubName:zod.string().optional(),
    ticketPrice:zod.number().optional(),
    location:zod.string().optional(),
})
const updateUserSchema = zod.object({
  firstName: zod.string().min(3),
  lastName:zod.string().min(2),
  password: zod.string().min(6),
  Branch: zod.string(),
  collegeMail: zod.string().email(),
  year: zod.number(),
  techStack: zod.string().optional(),
});

const createMentorSchema = zod.object({
  name: zod.string({ required_error: "Name is required" }).min(1, "Name must not be empty").trim(),
  image: zod.string({ required_error: "Image path is required" }).min(1, "Image must not be empty").trim(),
  discord: zod.string().min(1, "Discord username must not be empty").trim().optional(),
  linkedIn: zod.string({ required_error: "LinkedIn is required" }).url("LinkedIn must be a valid URL").trim(),
  techStack: zod.string({ required_error: "Tech stack is required" }).min(1, "Tech stack must not be empty").trim(),
  bannerKeywords: zod.string().min(1, "Banner keywords must not be empty").trim().optional(),
});

const updateMentorSchema = zod.object({
  name: zod.string().min(1, "Name cannot be empty").trim().optional(),
  image: zod.string().min(1, "Image path cannot be empty").trim().optional(),
  discord: zod.string().min(1, "Discord cannot be empty").trim().optional(),
  linkedIn: zod.string().url("Invalid LinkedIn URL").trim().optional(),
  techStack: zod.string().min(1, "Tech stack cannot be empty").trim().optional(),
  bannerKeywords: zod.string().min(1, "Banner keywords cannot be empty").trim().optional(),
});

export { signUpSchema, signinSchema, eventSchema, updateEventSchema, updateUserSchema, createMentorSchema, updateMentorSchema };
