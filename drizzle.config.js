/**@type {import("drizzle-kit").Config} */

export default  {

    out:"./drizzle",
     dialect: "postgresql",
    schema: "./db/schema.js",
    dbCredentials:{
      url: process.env.DATABASE_URL,
    },
    studio:{
      port:4980
    },
    migrations: {
    table: 'journal', 
    schema: 'drizzle', 
  },
  };
 

