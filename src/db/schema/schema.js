import { relations } from "drizzle-orm";
import { date, integer, uuid } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const userDetails = pgTable("userDetails", {
  id: serial().primaryKey(),
  userId: uuid().notNull(),
  firstName: varchar("firstName").notNull(),
  lastName:varchar("lastName"),
  password: varchar("password").notNull(),
  Branch: varchar("branch").notNull(),
  collegeMail: varchar("collegeMail").notNull().unique(),
  year: varchar("year").notNull(),
  techStack: varchar("techStack"),
  refreshToken: varchar("refreshToken"),
  roles:varchar("roles").default("member").notNull()
});

export const eventDetails = pgTable("eventDetails",{
  eventId:uuid().notNull(),
  name:varchar("name").notNull(),
  startDate:date("startDate").notNull(),
  endDate:date("endDate").notNull(),
  imageUrl:varchar("imageUrl").default("default.png").notNull(),
  description:varchar("description").notNull(),
  registrationLink:varchar("resgistrationLink").notNull(),
  documentLink:varchar("documentLink").notNull(),
  clubName:varchar("clubName").notNull(),
  ticketPrice:integer("ticketPrice").default(0).notNull(),
  location:varchar("location").notNull(),
  createdBy:varchar("createdBy").notNull()
})

export const mentorDetails = pgTable("mentorDetails", {
  id: serial().primaryKey(),
  mentorId: uuid("mentorId").notNull(),
  name: varchar("name").notNull(),
  image: varchar("image").notNull(),
  discord: varchar("discord"),
  linkedIn: varchar("linkedIn").notNull(),
  techStack: varchar("techStack").notNull(),
  bannerKeywords: varchar("bannerKeywords"),
});

export const usersRelations = relations(userDetails, ({ many }) => ({
	eventDetails: many(eventDetails),
}));

export const eventRelations = relations(eventDetails,({one})=>({
  creator: one(userDetails,{
    fields:[eventDetails.createdBy],
    references:[userDetails.userId]
  })
}))