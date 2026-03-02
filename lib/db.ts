import { Pool } from "pg";


const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:sahil34@@localhost:5432/urlshortener';

export const pool = new Pool({
  connectionString: databaseUrl,
});