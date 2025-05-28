import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://neondb_owner:npg_eX3EnDoWdFv1@ep-young-art-a4w9bmtm-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require")
const db = drizzle({ client: sql });
export default db