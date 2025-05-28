import { uuid } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable, varchar } from "drizzle-orm/pg-core";


export const userDetails = pgTable("userDetails",
    {
        id:serial().primaryKey(),
        userId:uuid().notNull(),
        name:varchar('name').notNull(),
        password:varchar('password').notNull(),
        Branch:varchar('branch').notNull(),
        collegeMail:varchar('collegeMail').notNull().unique(),
        year:varchar('year').notNull(),
        techStack:varchar('techStack'),
        refreshToken:varchar('refreshToken'),
    })