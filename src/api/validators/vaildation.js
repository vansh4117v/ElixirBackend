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

export { signUpSchema, signinSchema,eventSchema, updateEventSchema,updateUserSchema };
