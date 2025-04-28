const { serial } = require( "drizzle-orm/pg-core");
const { pgTable, varchar } = require("drizzle-orm/pg-core");


module.exports = { userDetails : pgTable("userDetails",
    {
         id:serial().primaryKey(),
        name:varchar('name').notNull(),
        password:varchar('password').notNull(),
        Branch:varchar('branch').notNull(),
        collegeMail:varchar('collegeMail').notNull().unique(),
        year:varchar('year').notNull(),
        techStack:varchar('techStack')
    })}