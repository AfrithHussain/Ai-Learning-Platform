import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load `.env.local` from the project root
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

export default defineConfig({
  schema: './config/schema.js', // your schema path
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL, // now this will be defined
  },
});
