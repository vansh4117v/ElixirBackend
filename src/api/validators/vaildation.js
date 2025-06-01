import zod from "zod";

const signUpSchema = zod.object({
  name: zod.string().min(3),
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

export { signUpSchema, signinSchema };
