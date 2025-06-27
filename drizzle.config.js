/**@type {import("drizzle-kit").Config} */
console.log(process.env.DATABASE_URL)
export default {
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema/schema.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  studio: {
    port: 4980,
  },
  migrations: {
    table: "journal",
    schema: "drizzle",
  },
};
