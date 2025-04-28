
const  {neon} = require("@neondatabase/serverless")

const {db} = require('drizzle-orm')
const { drizzle } = require("drizzle-orm/neon-http")

const sql = neon(process.env.DATABASE_URL)

module.exports = { db:drizzle(sql) }