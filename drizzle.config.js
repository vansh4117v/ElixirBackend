/**@type {import("drizzle-kit").Config} */

export default  {
     dialect: "postgresql",
    schema: "./db/schema.js",
    dbCredentials:{
      url: process.env.DATABASE_URL,
    },
    studio:{
      port:4980
    }
  };
 

